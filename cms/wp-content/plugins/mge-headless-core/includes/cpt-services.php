<?php
/**
 * Custom Post Type: Services
 *
 * Engineering services offered by MGE Engineering Sdn Bhd.
 *
 * @package MGE_Headless_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register Services CPT.
 */
function mge_register_cpt_services() {
    $labels = array(
        'name'                  => 'Services',
        'singular_name'         => 'Service',
        'menu_name'             => 'Services',
        'add_new'               => 'Add Service',
        'add_new_item'          => 'Add New Service',
        'edit_item'             => 'Edit Service',
        'new_item'              => 'New Service',
        'view_item'             => 'View Service',
        'search_items'          => 'Search Services',
        'not_found'             => 'No services found',
        'not_found_in_trash'    => 'No services found in trash',
        'all_items'             => 'All Services',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true, // Expose to REST API
        'rest_base'           => 'services',
        'menu_position'       => 5,
        'menu_icon'           => 'dashicons-hammer',
        'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'has_archive'         => false,
        'rewrite'             => array( 'slug' => 'services' ),
        'capability_type'     => 'post',
    );

    register_post_type( 'mge_service', $args );
}

add_action( 'init', 'mge_register_cpt_services' );

/**
 * Register Service Category taxonomy.
 */
function mge_register_service_taxonomy() {
    register_taxonomy( 'service_category', 'mge_service', array(
        'labels'            => array(
            'name'          => 'Service Categories',
            'singular_name' => 'Service Category',
            'add_new_item'  => 'Add New Category',
        ),
        'public'            => false,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'rest_base'         => 'service-categories',
        'hierarchical'      => true,
        'rewrite'           => array( 'slug' => 'service-category' ),
    ));
}

add_action( 'init', 'mge_register_service_taxonomy' );
