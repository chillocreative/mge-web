<?php
/**
 * Custom Post Type: Gallery
 *
 * Project gallery / photo documentation for MGE Engineering Sdn Bhd.
 *
 * @package MGE_Headless_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register Gallery CPT.
 */
function mge_register_cpt_gallery() {
    $labels = array(
        'name'                  => 'Gallery',
        'singular_name'         => 'Gallery Item',
        'menu_name'             => 'Gallery',
        'add_new'               => 'Add Image',
        'add_new_item'          => 'Add Gallery Image',
        'edit_item'             => 'Edit Gallery Item',
        'new_item'              => 'New Gallery Item',
        'view_item'             => 'View Gallery Item',
        'search_items'          => 'Search Gallery',
        'not_found'             => 'No gallery items found',
        'not_found_in_trash'    => 'No gallery items in trash',
        'all_items'             => 'All Gallery',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'rest_base'           => 'gallery',
        'menu_position'       => 7,
        'menu_icon'           => 'dashicons-format-gallery',
        'supports'            => array( 'title', 'thumbnail', 'custom-fields' ),
        'has_archive'         => false,
        'rewrite'             => array( 'slug' => 'gallery' ),
        'capability_type'     => 'post',
    );

    register_post_type( 'mge_gallery', $args );
}

add_action( 'init', 'mge_register_cpt_gallery' );

/**
 * Register Gallery Category taxonomy.
 */
function mge_register_gallery_taxonomy() {
    register_taxonomy( 'gallery_category', 'mge_gallery', array(
        'labels'            => array(
            'name'          => 'Gallery Categories',
            'singular_name' => 'Gallery Category',
            'add_new_item'  => 'Add New Category',
        ),
        'public'            => false,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'rest_base'         => 'gallery-categories',
        'hierarchical'      => true,
        'rewrite'           => array( 'slug' => 'gallery-category' ),
    ));
}

add_action( 'init', 'mge_register_gallery_taxonomy' );
