<?php
/**
 * Custom Post Type: Projects
 *
 * Engineering projects / portfolio for MGE Engineering Sdn Bhd.
 *
 * @package MGE_Headless_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register Projects CPT.
 */
function mge_register_cpt_projects() {
    $labels = array(
        'name'                  => 'Projects',
        'singular_name'         => 'Project',
        'menu_name'             => 'Projects',
        'add_new'               => 'Add Project',
        'add_new_item'          => 'Add New Project',
        'edit_item'             => 'Edit Project',
        'new_item'              => 'New Project',
        'view_item'             => 'View Project',
        'search_items'          => 'Search Projects',
        'not_found'             => 'No projects found',
        'not_found_in_trash'    => 'No projects found in trash',
        'all_items'             => 'All Projects',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => false,
        'publicly_queryable'  => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'rest_base'           => 'projects',
        'menu_position'       => 6,
        'menu_icon'           => 'dashicons-building',
        'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
        'has_archive'         => false,
        'rewrite'             => array( 'slug' => 'projects' ),
        'capability_type'     => 'post',
    );

    register_post_type( 'mge_project', $args );
}

add_action( 'init', 'mge_register_cpt_projects' );

/**
 * Register Project Category taxonomy.
 */
function mge_register_project_taxonomy() {
    register_taxonomy( 'project_category', 'mge_project', array(
        'labels'            => array(
            'name'          => 'Project Categories',
            'singular_name' => 'Project Category',
            'add_new_item'  => 'Add New Category',
        ),
        'public'            => false,
        'show_ui'           => true,
        'show_in_rest'      => true,
        'rest_base'         => 'project-categories',
        'hierarchical'      => true,
        'rewrite'           => array( 'slug' => 'project-category' ),
    ));
}

add_action( 'init', 'mge_register_project_taxonomy' );
