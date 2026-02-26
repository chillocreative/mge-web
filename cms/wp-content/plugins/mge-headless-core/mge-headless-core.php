<?php
/**
 * Plugin Name: MGE Headless Core
 * Plugin URI: https://mge-engineering.com
 * Description: Core plugin for MGE Engineering headless CMS. Registers Custom Post Types, ACF fields, REST API endpoints, and CORS configuration.
 * Version: 1.0.0
 * Author: MGE Engineering Sdn Bhd
 * Requires at least: 6.0
 * Requires PHP: 8.0
 * Text Domain: mge-headless
 *
 * @package MGE_Headless_Core
 */

// Prevent direct access
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'MGE_HEADLESS_VERSION', '1.0.0' );
define( 'MGE_HEADLESS_PATH', plugin_dir_path( __FILE__ ) );

// Load modules
require_once MGE_HEADLESS_PATH . 'includes/cpt-services.php';
require_once MGE_HEADLESS_PATH . 'includes/cpt-projects.php';
require_once MGE_HEADLESS_PATH . 'includes/cpt-gallery.php';
require_once MGE_HEADLESS_PATH . 'includes/acf-fields.php';
require_once MGE_HEADLESS_PATH . 'includes/rest-api.php';
require_once MGE_HEADLESS_PATH . 'includes/cors.php';
require_once MGE_HEADLESS_PATH . 'includes/security.php';
require_once MGE_HEADLESS_PATH . 'includes/webhook.php';

/**
 * Plugin activation hook.
 */
register_activation_hook( __FILE__, function () {
    // Register CPTs before flushing
    mge_register_cpt_services();
    mge_register_cpt_projects();
    mge_register_cpt_gallery();
    flush_rewrite_rules();
});

/**
 * Plugin deactivation hook.
 */
register_deactivation_hook( __FILE__, function () {
    flush_rewrite_rules();
});
