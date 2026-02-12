<?php
/**
 * MGE Headless Theme Functions
 *
 * Minimal theme that disables frontend rendering for headless CMS operation.
 * All content is served via REST API to the Next.js frontend.
 *
 * @package MGE_Headless
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Redirect all frontend requests to the Next.js app.
 * Only wp-admin, wp-login, wp-json, and wp-cron are accessible.
 */
add_action( 'template_redirect', function () {
    // Allow REST API, admin, login, cron, and AJAX
    if (
        is_admin() ||
        wp_doing_ajax() ||
        wp_doing_cron() ||
        ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ||
        strpos( $_SERVER['REQUEST_URI'], '/wp-json/' ) !== false ||
        strpos( $_SERVER['REQUEST_URI'], '/wp-login.php' ) !== false ||
        strpos( $_SERVER['REQUEST_URI'], '/wp-admin' ) !== false
    ) {
        return;
    }

    $frontend_url = defined( 'MGE_FRONTEND_URL' ) ? MGE_FRONTEND_URL : 'http://localhost:3000';
    wp_redirect( $frontend_url, 301 );
    exit;
});

/**
 * Remove unnecessary frontend features for headless operation.
 */
add_action( 'after_setup_theme', function () {
    // Add basic theme support needed for REST API
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'title-tag' );
    add_theme_support( 'custom-logo' );
});

/**
 * Remove frontend-only head items to reduce overhead.
 */
add_action( 'init', function () {
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_action( 'wp_head', 'wp_generator' );
    remove_action( 'wp_head', 'wlwmanifest_link' );
    remove_action( 'wp_head', 'rsd_link' );
    remove_action( 'wp_head', 'wp_shortlink_wp_head' );
    remove_action( 'wp_head', 'rest_output_link_wp_head' );
    remove_action( 'wp_head', 'feed_links', 2 );
    remove_action( 'wp_head', 'feed_links_extra', 3 );
});

/**
 * Disable admin bar on frontend (not needed in headless).
 */
add_filter( 'show_admin_bar', '__return_false' );
