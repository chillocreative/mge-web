<?php
/**
 * Custom Post Type: Certificates
 *
 * Company certifications and accreditations shown on the
 * /about-us/certificates page (CIDB grade, ISO, PKK status, etc.).
 *
 * @package MGE_Headless_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register Certificates CPT.
 */
function mge_register_cpt_certificates() {
    $labels = array(
        'name'                  => 'Certificates',
        'singular_name'         => 'Certificate',
        'menu_name'             => 'Certificates',
        'add_new'               => 'Add Certificate',
        'add_new_item'          => 'Add New Certificate',
        'edit_item'             => 'Edit Certificate',
        'new_item'              => 'New Certificate',
        'view_item'             => 'View Certificate',
        'search_items'          => 'Search Certificates',
        'not_found'             => 'No certificates found',
        'not_found_in_trash'    => 'No certificates found in trash',
        'all_items'             => 'All Certificates',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'rest_base'           => 'certificates',
        'menu_position'       => 8,
        'menu_icon'           => 'dashicons-awards',
        // Title only — every other field (issuer, summary, details, status)
        // lives in the Certificate Details ACF group below the title.
        'supports'            => array( 'title' ),
        'has_archive'         => false,
        'rewrite'             => array( 'slug' => 'certificates' ),
        'capability_type'     => 'post',
    );

    register_post_type( 'mge_certificate', $args );
}

add_action( 'init', 'mge_register_cpt_certificates' );
