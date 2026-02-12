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
                'key'           => 'field_project_year',
                'label'         => 'Year',
                'name'          => 'project_year',
                'type'          => 'text',
                'instructions'  => 'Project completion year.',
                'required'      => 1,
            ),
            array(
                'key'           => 'field_project_client',
                'label'         => 'Client',
                'name'          => 'project_client',
                'type'          => 'text',
                'instructions'  => 'Client or agency name (e.g., "SAJ Ranhill").',
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
                'key'           => 'field_project_gallery',
                'label'         => 'Project Gallery',
                'name'          => 'project_gallery',
                'type'          => 'gallery',
                'instructions'  => 'Upload project photos. First image is the cover.',
                'return_format' => 'array',
                'preview_size'  => 'medium',
                'min'           => 1,
                'max'           => 20,
            ),
            array(
                'key'           => 'field_project_status',
                'label'         => 'Status',
                'name'          => 'project_status',
                'type'          => 'select',
                'choices'       => array(
                    'completed'   => 'Completed',
                    'in_progress' => 'In Progress',
                    'upcoming'    => 'Upcoming',
                ),
                'default_value' => 'completed',
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
    ));
}
