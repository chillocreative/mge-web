<?php
/**
 * Security Hardening
 *
 * Disables unnecessary WordPress features for headless operation
 * and adds security headers.
 *
 * @package MGE_Headless_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Disable XML-RPC completely (attack vector not needed for headless).
 */
add_filter( 'xmlrpc_enabled', '__return_false' );

/**
 * Remove XML-RPC discovery headers.
 */
add_action( 'init', function () {
    remove_action( 'wp_head', 'rsd_link' );
}, 20 );

/**
 * Block XML-RPC requests at the HTTP level.
 */
add_action( 'init', function () {
    if ( isset( $_SERVER['REQUEST_URI'] ) && strpos( $_SERVER['REQUEST_URI'], 'xmlrpc.php' ) !== false ) {
        header( 'HTTP/1.1 403 Forbidden' );
        exit( 'XML-RPC is disabled.' );
    }
});

/**
 * Hide WordPress version from headers.
 */
add_filter( 'the_generator', '__return_empty_string' );

/**
 * Disable user enumeration via REST API (prevent username scraping).
 */
add_filter( 'rest_endpoints', function ( $endpoints ) {
    if ( isset( $endpoints['/wp/v2/users'] ) ) {
        unset( $endpoints['/wp/v2/users'] );
    }
    if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
    }
    return $endpoints;
});

/**
 * Disable author archives (prevent username discovery).
 */
add_action( 'template_redirect', function () {
    if ( is_author() ) {
        wp_redirect( home_url(), 301 );
        exit;
    }
});

/**
 * Add security headers to admin pages.
 */
add_action( 'admin_init', function () {
    header( 'X-Content-Type-Options: nosniff' );
    header( 'X-Frame-Options: SAMEORIGIN' );
    header( 'X-XSS-Protection: 1; mode=block' );
    header( 'Referrer-Policy: strict-origin-when-cross-origin' );
});

/**
 * Limit login attempts (basic rate limiting).
 */
add_filter( 'authenticate', function ( $user, $username, $password ) {
    if ( empty( $username ) ) {
        return $user;
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $transient_key = 'mge_login_attempts_' . md5( $ip );
    $attempts = (int) get_transient( $transient_key );

    if ( $attempts >= 5 ) {
        return new WP_Error(
            'too_many_attempts',
            'Too many login attempts. Please try again in 15 minutes.'
        );
    }

    return $user;
}, 30, 3 );

/**
 * Track failed login attempts.
 */
add_action( 'wp_login_failed', function ( $username ) {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $transient_key = 'mge_login_attempts_' . md5( $ip );
    $attempts = (int) get_transient( $transient_key );
    set_transient( $transient_key, $attempts + 1, 15 * MINUTE_IN_SECONDS );
});

/**
 * Reset login attempts on successful login.
 */
add_action( 'wp_login', function () {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $transient_key = 'mge_login_attempts_' . md5( $ip );
    delete_transient( $transient_key );
});

/**
 * Disable REST API for unauthenticated users on sensitive endpoints.
 * Public CPT endpoints remain accessible.
 */
add_filter( 'rest_authentication_errors', function ( $result ) {
    if ( true === $result || is_wp_error( $result ) ) {
        return $result;
    }

    $route = $_SERVER['REQUEST_URI'] ?? '';

    // Allow public access to MGE endpoints and CPT endpoints
    $public_patterns = array(
        '/wp-json/mge/v1/',
        '/wp-json/wp/v2/services',
        '/wp-json/wp/v2/projects',
        '/wp-json/wp/v2/gallery',
        '/wp-json/wp/v2/pages',
        '/wp-json/wp/v2/posts',
        '/wp-json/wp/v2/media',
        '/wp-json/wp/v2/service-categories',
        '/wp-json/wp/v2/project-categories',
        '/wp-json/wp/v2/gallery-categories',
    );

    foreach ( $public_patterns as $pattern ) {
        if ( strpos( $route, $pattern ) !== false ) {
            return $result;
        }
    }

    // Require authentication for all other REST endpoints
    if ( ! is_user_logged_in() && strpos( $route, '/wp-json/' ) !== false ) {
        return new WP_Error(
            'rest_not_authorized',
            'Authentication required.',
            array( 'status' => 401 )
        );
    }

    return $result;
});
