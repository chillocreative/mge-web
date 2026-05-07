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
        'supports'            => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
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

/**
 * Add a "Bucket" column to the Projects admin list showing whether
 * each project lands in the Current or Previous table on the frontend.
 */
add_filter( 'manage_mge_project_posts_columns', function ( $columns ) {
    $new = array();
    foreach ( $columns as $key => $label ) {
        $new[ $key ] = $label;
        if ( $key === 'title' ) {
            $new['mge_bucket'] = 'Bucket';
            $new['mge_status'] = 'Status';
        }
    }
    return $new;
});

add_action( 'manage_mge_project_posts_custom_column', function ( $column, $post_id ) {
    if ( $column !== 'mge_bucket' && $column !== 'mge_status' ) {
        return;
    }

    $status = function_exists( 'get_field' )
        ? get_field( 'project_status', $post_id )
        : get_post_meta( $post_id, 'project_status', true );

    if ( ! $status ) {
        $status = 'in_progress';
    }

    $is_current = in_array( $status, array( 'in_progress', 'upcoming' ), true );

    $status_labels = array(
        'in_progress' => 'In Progress',
        'upcoming'    => 'Upcoming',
        'completed'   => 'Completed',
    );

    if ( $column === 'mge_bucket' ) {
        $color = $is_current ? '#15803d' : '#6b7280';
        $label = $is_current ? 'Current' : 'Previous';
        printf(
            '<span style="display:inline-block;padding:2px 8px;border-radius:3px;background:%s;color:#fff;font-size:11px;font-weight:600;">%s</span>',
            esc_attr( $color ),
            esc_html( $label )
        );
    } elseif ( $column === 'mge_status' ) {
        echo esc_html( $status_labels[ $status ] ?? $status );
    }
}, 10, 2 );
