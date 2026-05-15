<?php
/**
 * ACF Field Registration (Code-based)
 *
 * Registers all ACF field groups programmatically so they are
 * version-controlled and deploy-friendly for cPanel/GitHub Actions.
 *
 * Requires: Advanced Custom Fields (free or PRO).
 *
 * @package MGE_Headless_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register ACF fields only if ACF is active.
 */
add_action( 'acf/init', 'mge_register_acf_fields' );

function mge_register_acf_fields() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) {
        return;
    }

    // ============================================================
    // SERVICE FIELDS
    // ============================================================
    acf_add_local_field_group( array(
        'key'      => 'group_mge_service',
        'title'    => 'Service Details',
        'fields'   => array(
            array(
                'key'           => 'field_service_icon',
                'label'         => 'Icon Name',
                'name'          => 'service_icon',
                'type'          => 'select',
                'instructions'  => 'Select the Lucide icon name used in the frontend.',
                'choices'       => array(
                    'settings'  => 'Settings (Water Piping)',
                    'hardhat'   => 'Hard Hat (Civil)',
                    'zap'       => 'Zap (Mechanical)',
                    'shield'    => 'Shield (Electrical)',
                    'factory'   => 'Factory (Maintenance)',
                    'gauge'     => 'Gauge (Project Mgmt)',
                ),
                'default_value' => 'settings',
                'required'      => 1,
            ),
            array(
                'key'           => 'field_service_short_desc',
                'label'         => 'Short Description',
                'name'          => 'service_short_description',
                'type'          => 'textarea',
                'instructions'  => 'Brief description shown on service cards (max 200 chars).',
                'maxlength'     => 200,
                'rows'          => 3,
                'required'      => 1,
            ),
            array(
                'key'           => 'field_service_features',
                'label'         => 'Key Features',
                'name'          => 'service_features',
                'type'          => 'repeater',
                'instructions'  => 'List of key service capabilities.',
                'min'           => 1,
                'max'           => 10,
                'layout'        => 'table',
                'sub_fields'    => array(
                    array(
                        'key'   => 'field_feature_text',
                        'label' => 'Feature',
                        'name'  => 'feature_text',
                        'type'  => 'text',
                    ),
                ),
            ),
            array(
                'key'           => 'field_service_order',
                'label'         => 'Display Order',
                'name'          => 'service_order',
                'type'          => 'number',
                'instructions'  => 'Controls the order services appear on the frontend.',
                'default_value' => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'mge_service',
                ),
            ),
        ),
        'menu_order' => 0,
        'style'      => 'default',
        'position'   => 'normal',
        'active'     => true,
    ));

    // ============================================================
    // PROJECT FIELDS
    // ============================================================
    acf_add_local_field_group( array(
        'key'      => 'group_mge_project',
        'title'    => 'Project Details',
        'fields'   => array(
            array(
                'key'           => 'field_project_location',
                'label'         => 'Location',
                'name'          => 'project_location',
                'type'          => 'text',
                'instructions'  => 'Project location (e.g., "Kulai, Johor").',
                'required'      => 1,
            ),
            array(
                'key'           => 'field_project_start_date',
                'label'         => 'Start Date',
                'name'          => 'project_start_date',
                'type'          => 'text',
                'instructions'  => 'When the project started (e.g. "01.06.2018" or "June 2018").',
            ),
            array(
                'key'           => 'field_project_year',
                'label'         => 'Completion Date',
                'name'          => 'project_year',
                'type'          => 'text',
                'instructions'  => 'When the project finished or is expected to finish (e.g. "31.10.2027" or "2027").',
                'required'      => 1,
            ),
            array(
                'key'           => 'field_project_client',
                'label'         => 'Project Owner',
                'name'          => 'project_client',
                'type'          => 'text',
                'instructions'  => 'Project owner or agency name (e.g., "SAJ Ranhill").',
            ),
            array(
                'key'           => 'field_project_value',
                'label'         => 'Project Value (RM)',
                'name'          => 'project_value',
                'type'          => 'text',
                'instructions'  => 'Contract value (e.g., "RM 12.5 Million").',
            ),
            array(
                'key'           => 'field_project_scope',
                'label'         => 'Scope of Work',
                'name'          => 'project_scope',
                'type'          => 'textarea',
                'instructions'  => 'Brief scope description.',
                'rows'          => 4,
            ),
            array(
                'key'           => 'field_project_gallery_1',
                'label'         => 'Photo 1 (Cover)',
                'name'          => 'gallery_1',
                'type'          => 'image',
                'instructions'  => 'Cover photo shown first on the project detail page.',
                'return_format' => 'array',
                'preview_size'  => 'medium',
                'mime_types'    => 'jpg,jpeg,png,webp',
            ),
            array(
                'key'           => 'field_project_gallery_2',
                'label'         => 'Photo 2',
                'name'          => 'gallery_2',
                'type'          => 'image',
                'return_format' => 'array',
                'preview_size'  => 'medium',
                'mime_types'    => 'jpg,jpeg,png,webp',
            ),
            array(
                'key'           => 'field_project_gallery_3',
                'label'         => 'Photo 3',
                'name'          => 'gallery_3',
                'type'          => 'image',
                'return_format' => 'array',
                'preview_size'  => 'medium',
                'mime_types'    => 'jpg,jpeg,png,webp',
            ),
            array(
                'key'           => 'field_project_gallery_4',
                'label'         => 'Photo 4',
                'name'          => 'gallery_4',
                'type'          => 'image',
                'return_format' => 'array',
                'preview_size'  => 'medium',
                'mime_types'    => 'jpg,jpeg,png,webp',
            ),
            array(
                'key'           => 'field_project_gallery_5',
                'label'         => 'Photo 5',
                'name'          => 'gallery_5',
                'type'          => 'image',
                'return_format' => 'array',
                'preview_size'  => 'medium',
                'mime_types'    => 'jpg,jpeg,png,webp',
            ),
            array(
                'key'           => 'field_project_status',
                'label'         => 'Status',
                'name'          => 'project_status',
                'type'          => 'select',
                'instructions'  => 'Choose where this project appears on the Projects page. "Current" projects show in the Current Projects table; "Previous" projects show in the Previous Projects table.',
                'choices'       => array(
                    'in_progress' => 'Current — In Progress',
                    'upcoming'    => 'Current — Upcoming',
                    'completed'   => 'Previous — Completed',
                ),
                'default_value' => 'in_progress',
            ),
            array(
                'key'           => 'field_project_featured',
                'label'         => 'Featured Project',
                'name'          => 'project_featured',
                'type'          => 'true_false',
                'instructions'  => 'Show this project on the homepage.',
                'default_value' => 0,
                'ui'            => 1,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'mge_project',
                ),
            ),
        ),
        'menu_order' => 0,
        'style'      => 'default',
        'position'   => 'normal',
        'active'     => true,
    ));

    // ============================================================
    // GALLERY FIELDS
    // ============================================================
    acf_add_local_field_group( array(
        'key'      => 'group_mge_gallery',
        'title'    => 'Gallery Details',
        'fields'   => array(
            array(
                'key'           => 'field_gallery_image',
                'label'         => 'Gallery Image',
                'name'          => 'gallery_image',
                'type'          => 'image',
                'instructions'  => 'Upload the gallery image.',
                'return_format' => 'array',
                'preview_size'  => 'medium',
                'required'      => 1,
            ),
            array(
                'key'           => 'field_gallery_caption',
                'label'         => 'Caption',
                'name'          => 'gallery_caption',
                'type'          => 'text',
                'instructions'  => 'Short caption for this image.',
            ),
            array(
                'key'           => 'field_gallery_project_link',
                'label'         => 'Related Project',
                'name'          => 'gallery_project_link',
                'type'          => 'post_object',
                'instructions'  => 'Link this image to a project (optional).',
                'post_type'     => array( 'mge_project' ),
                'return_format' => 'id',
                'allow_null'    => 1,
            ),
            array(
                'key'           => 'field_gallery_order',
                'label'         => 'Display Order',
                'name'          => 'gallery_order',
                'type'          => 'number',
                'default_value' => 0,
            ),
        ),
        'location' => array(
            array(
                array(
                    'param'    => 'post_type',
                    'operator' => '==',
                    'value'    => 'mge_gallery',
                ),
            ),
        ),
        'menu_order' => 0,
        'style'      => 'default',
        'position'   => 'normal',
        'active'     => true,
    ));
}

/**
 * MGE post types that should never show an empty "Meta Boxes" container
 * under the Gutenberg editor. ACF renders fields in the document sidebar.
 */
function mge_managed_cpts() {
    return array( 'mge_service', 'mge_project', 'mge_gallery' );
}

/**
 * Remove the legacy WordPress "Custom Fields" meta box on MGE CPTs.
 *
 * Why: with `'custom-fields'` removed from `supports`, the postcustom
 * meta box should not register, but some installs (and add-on plugins)
 * still register it, leaving an empty "Meta Boxes" panel under the
 * Gutenberg editor when adding a new Service / Project / Gallery item.
 */
add_action( 'admin_menu', function () {
    foreach ( mge_managed_cpts() as $cpt ) {
        remove_meta_box( 'postcustom', $cpt, 'normal' );
        remove_meta_box( 'slugdiv',    $cpt, 'normal' );
    }
}, 100 );

/**
 * Reset any saved per-user `meta-box-order_<cpt>` preference that may have
 * been created by an earlier drag-and-drop. Without this, the ACF field
 * group can get stranded in the sidebar (or hidden) because WordPress
 * remembers where the user previously moved it. Returning false here makes
 * WordPress fall back to each meta box's registered position (`normal`
 * for our ACF groups), so the Service Details panel always renders below
 * the editor where users expect it.
 */
add_filter( 'get_user_option_meta-box-order_mge_service', '__return_false' );
add_filter( 'get_user_option_meta-box-order_mge_project', '__return_false' );
add_filter( 'get_user_option_meta-box-order_mge_gallery', '__return_false' );
