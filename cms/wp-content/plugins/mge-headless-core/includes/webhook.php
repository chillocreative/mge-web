<?php
/**
 * GitHub Actions rebuild webhook.
 *
 * Dispatches a workflow_dispatch event to GitHub Actions whenever a project,
 * service, or gallery post is published/updated, so the static Next.js site
 * rebuilds and deploys automatically — no manual git push required.
 *
 * Setup: add the following line to wp-config.php on the production server:
 *   define( 'MGE_GITHUB_TOKEN', 'github_pat_YOUR_TOKEN_HERE' );
 *
 * Create a Fine-grained Personal Access Token at:
 *   GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens
 *   Repository: chillocreative/mge-web
 *   Permission: Actions → Read and write
 *
 * @package MGE_Headless_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Trigger a GitHub Actions workflow dispatch when content is published/updated.
 *
 * Uses a 2-minute transient debounce so rapid bulk saves only fire one rebuild.
 *
 * @param int     $post_id The post ID.
 * @param WP_Post $post    The post object.
 * @param bool    $update  Whether this is an update.
 */
function mge_trigger_github_rebuild( int $post_id, WP_Post $post, bool $update ): void {
    // Skip auto-saves and revisions.
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( wp_is_post_revision( $post_id ) ) {
        return;
    }

    // Only rebuild for content post types.
    $rebuild_types = [ 'mge_project', 'mge_service', 'mge_gallery' ];
    if ( ! in_array( $post->post_type, $rebuild_types, true ) ) {
        return;
    }

    // Only rebuild when the post is actually published.
    if ( $post->post_status !== 'publish' ) {
        return;
    }

    // Require a GitHub token defined in wp-config.php.
    if ( ! defined( 'MGE_GITHUB_TOKEN' ) || empty( MGE_GITHUB_TOKEN ) ) {
        return;
    }

    // Debounce: skip if a rebuild was already triggered in the last 2 minutes.
    if ( get_transient( 'mge_rebuild_pending' ) ) {
        return;
    }
    set_transient( 'mge_rebuild_pending', true, 2 * MINUTE_IN_SECONDS );

    // Dispatch the GitHub Actions workflow.
    $response = wp_remote_post(
        'https://api.github.com/repos/chillocreative/mge-web/actions/workflows/deploy.yml/dispatches',
        [
            'headers' => [
                'Authorization'        => 'Bearer ' . MGE_GITHUB_TOKEN,
                'Accept'               => 'application/vnd.github+json',
                'Content-Type'         => 'application/json',
                'X-GitHub-Api-Version' => '2022-11-28',
                'User-Agent'           => 'MGE-Headless-Core/1.0',
            ],
            'body'    => wp_json_encode( [ 'ref' => 'main' ] ),
            'timeout' => 15,
        ]
    );

    if ( is_wp_error( $response ) ) {
        error_log( 'MGE Rebuild: Failed to reach GitHub API — ' . $response->get_error_message() );
        return;
    }

    $code = wp_remote_retrieve_response_code( $response );

    if ( $code === 204 ) {
        // Store the trigger info for the admin notice.
        update_option( 'mge_last_rebuild_triggered', current_time( 'mysql' ) );
        update_option( 'mge_last_rebuild_post', $post->post_title );
    } else {
        $body = wp_remote_retrieve_body( $response );
        error_log( "MGE Rebuild: GitHub API returned HTTP {$code} — {$body}" );
    }
}
add_action( 'save_post', 'mge_trigger_github_rebuild', 20, 3 );

/**
 * Show an admin notice confirming a rebuild was triggered.
 *
 * Visible for 10 minutes after the trigger so the user knows the deploy is in progress.
 */
function mge_rebuild_admin_notice(): void {
    $last = get_option( 'mge_last_rebuild_triggered' );

    if ( ! $last ) {
        return;
    }

    // Hide the notice after 10 minutes.
    if ( strtotime( $last ) < ( time() - 10 * MINUTE_IN_SECONDS ) ) {
        return;
    }

    $post_title = get_option( 'mge_last_rebuild_post', '' );
    $elapsed    = human_time_diff( strtotime( $last ), time() );
    ?>
    <div class="notice notice-success is-dismissible">
        <p>
            <strong>&#x1F6AB; MGE Website Rebuild Triggered</strong> &mdash;
            A site rebuild and deploy started <?php echo esc_html( $elapsed ); ?> ago
            <?php if ( $post_title ) : ?>
                after saving <em><?php echo esc_html( $post_title ); ?></em>
            <?php endif; ?>.
            <br>
            Changes will be live on <strong>mge-eng.com</strong> in approximately 2&ndash;3 minutes.
        </p>
    </div>
    <?php
}
add_action( 'admin_notices', 'mge_rebuild_admin_notice' );
