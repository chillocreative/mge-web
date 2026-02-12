<?php
/**
 * CORS Configuration
 *
 * Handles Cross-Origin Resource Sharing headers for the REST API.
 * Allows the Next.js frontend to make client-side requests.
 *
 * Note: Server-side requests from Next.js (Server Components, SSR)
 * do NOT require CORS. This configuration only covers client-side
 * requests (contact form, dynamic gallery loading, etc).
 *
 * @package MGE_Headless_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Add CORS headers to REST API responses.
 */
add_action( 'rest_api_init', function () {
    // Remove default WordPress CORS handling to prevent conflicts
    remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );

    add_filter( 'rest_pre_serve_request', function ( $value ) {
        $origin = get_http_origin();

        // Allowed origins - update for production
        $allowed_origins = array(
            'http://localhost:3000',           // Next.js dev server
            'http://mge-website.test',         // Laragon local frontend
        );

        // Allow configuring production frontend URL from wp-config.php
        if ( defined( 'MGE_FRONTEND_URL' ) ) {
            $allowed_origins[] = MGE_FRONTEND_URL;
        }

        if ( in_array( $origin, $allowed_origins, true ) ) {
            header( 'Access-Control-Allow-Origin: ' . $origin );
            header( 'Access-Control-Allow-Credentials: true' );
        }

        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
        header( 'Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce' );
        header( 'Access-Control-Max-Age: 86400' ); // Cache preflight for 24h

        return $value;
    });
}, 15 );

/**
 * Handle OPTIONS preflight requests early.
 */
add_action( 'init', function () {
    if ( isset( $_SERVER['REQUEST_METHOD'] ) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
        $origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? $_SERVER['HTTP_ORIGIN'] : '';

        $allowed_origins = array(
            'http://localhost:3000',
            'http://mge-website.test',
        );

        if ( defined( 'MGE_FRONTEND_URL' ) ) {
            $allowed_origins[] = MGE_FRONTEND_URL;
        }

        if ( in_array( $origin, $allowed_origins, true ) ) {
            header( 'Access-Control-Allow-Origin: ' . $origin );
            header( 'Access-Control-Allow-Credentials: true' );
        }

        header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS' );
        header( 'Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce' );
        header( 'Access-Control-Max-Age: 86400' );
        header( 'Content-Length: 0' );
        header( 'Content-Type: text/plain' );
        exit;
    }
});
