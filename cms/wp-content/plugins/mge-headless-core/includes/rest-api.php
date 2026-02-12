<?php
/**
 * REST API Customization
 *
 * Adds ACF fields to REST API responses, creates custom endpoints,
 * and configures response formatting for the Next.js frontend.
 *
 * @package MGE_Headless_Core
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register ACF fields in REST API responses for all MGE CPTs.
 */
add_action( 'rest_api_init', 'mge_register_rest_fields' );

function mge_register_rest_fields() {

    // ----------------------------------------------------------
    // SERVICES: Add ACF fields to REST response
    // ----------------------------------------------------------
    register_rest_field( 'mge_service', 'acf', array(
        'get_callback' => function ( $post ) {
            $fields = get_fields( $post['id'] );
            if ( ! $fields ) {
                return array();
            }

            return array(
                'icon'              => $fields['service_icon'] ?? 'settings',
                'short_description' => $fields['service_short_description'] ?? '',
                'features'          => array_map( function ( $item ) {
                    return $item['feature_text'] ?? '';
                }, $fields['service_features'] ?? array() ),
                'display_order'     => (int) ( $fields['service_order'] ?? 0 ),
            );
        },
        'schema' => array(
            'type'        => 'object',
            'description' => 'Service custom fields',
        ),
    ));

    // ----------------------------------------------------------
    // PROJECTS: Add ACF fields to REST response
    // ----------------------------------------------------------
    register_rest_field( 'mge_project', 'acf', array(
        'get_callback' => function ( $post ) {
            $fields = get_fields( $post['id'] );
            if ( ! $fields ) {
                return array();
            }

            // Process gallery images
            $gallery = array();
            if ( ! empty( $fields['project_gallery'] ) && is_array( $fields['project_gallery'] ) ) {
                foreach ( $fields['project_gallery'] as $image ) {
                    $gallery[] = array(
                        'id'        => $image['id'] ?? 0,
                        'url'       => $image['url'] ?? '',
                        'alt'       => $image['alt'] ?? '',
                        'width'     => $image['width'] ?? 0,
                        'height'    => $image['height'] ?? 0,
                        'thumbnail' => $image['sizes']['thumbnail'] ?? '',
                        'medium'    => $image['sizes']['medium'] ?? '',
                        'large'     => $image['sizes']['large'] ?? '',
                    );
                }
            }

            return array(
                'location'  => $fields['project_location'] ?? '',
                'year'      => $fields['project_year'] ?? '',
                'client'    => $fields['project_client'] ?? '',
                'value'     => $fields['project_value'] ?? '',
                'scope'     => $fields['project_scope'] ?? '',
                'gallery'   => $gallery,
                'status'    => $fields['project_status'] ?? 'completed',
                'featured'  => (bool) ( $fields['project_featured'] ?? false ),
            );
        },
        'schema' => array(
            'type'        => 'object',
            'description' => 'Project custom fields',
        ),
    ));

    // ----------------------------------------------------------
    // GALLERY: Add ACF fields to REST response
    // ----------------------------------------------------------
    register_rest_field( 'mge_gallery', 'acf', array(
        'get_callback' => function ( $post ) {
            $fields = get_fields( $post['id'] );
            if ( ! $fields ) {
                return array();
            }

            $image = $fields['gallery_image'] ?? null;
            $image_data = array();
            if ( $image && is_array( $image ) ) {
                $image_data = array(
                    'id'        => $image['id'] ?? 0,
                    'url'       => $image['url'] ?? '',
                    'alt'       => $image['alt'] ?? '',
                    'width'     => $image['width'] ?? 0,
                    'height'    => $image['height'] ?? 0,
                    'thumbnail' => $image['sizes']['thumbnail'] ?? '',
                    'medium'    => $image['sizes']['medium'] ?? '',
                    'large'     => $image['sizes']['large'] ?? '',
                );
            }

            return array(
                'image'        => $image_data,
                'caption'      => $fields['gallery_caption'] ?? '',
                'project_id'   => $fields['gallery_project_link'] ?? null,
                'display_order' => (int) ( $fields['gallery_order'] ?? 0 ),
            );
        },
        'schema' => array(
            'type'        => 'object',
            'description' => 'Gallery custom fields',
        ),
    ));

    // ----------------------------------------------------------
    // ALL CPTs: Add featured image URL to REST response
    // ----------------------------------------------------------
    $cpts = array( 'mge_service', 'mge_project', 'mge_gallery' );
    foreach ( $cpts as $cpt ) {
        register_rest_field( $cpt, 'featured_image_url', array(
            'get_callback' => function ( $post ) {
                $image_id = get_post_thumbnail_id( $post['id'] );
                if ( ! $image_id ) {
                    return null;
                }
                $sizes = array();
                foreach ( array( 'thumbnail', 'medium', 'large', 'full' ) as $size ) {
                    $img = wp_get_attachment_image_src( $image_id, $size );
                    if ( $img ) {
                        $sizes[ $size ] = $img[0];
                    }
                }
                return $sizes;
            },
            'schema' => array(
                'type'        => 'object',
                'description' => 'Featured image URLs by size',
            ),
        ));
    }
}

/**
 * Custom REST endpoint: GET /wp-json/mge/v1/services
 * Returns a clean, formatted list of all services.
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'mge/v1', '/services', array(
        'methods'             => 'GET',
        'callback'            => 'mge_api_get_services',
        'permission_callback' => '__return_true',
        'args'                => array(
            'per_page' => array(
                'default'           => 10,
                'sanitize_callback' => 'absint',
            ),
            'page' => array(
                'default'           => 1,
                'sanitize_callback' => 'absint',
            ),
            'orderby' => array(
                'default'           => 'menu_order',
                'sanitize_callback' => 'sanitize_text_field',
            ),
        ),
    ));

    register_rest_route( 'mge/v1', '/projects', array(
        'methods'             => 'GET',
        'callback'            => 'mge_api_get_projects',
        'permission_callback' => '__return_true',
        'args'                => array(
            'per_page' => array(
                'default'           => 10,
                'sanitize_callback' => 'absint',
            ),
            'page' => array(
                'default'           => 1,
                'sanitize_callback' => 'absint',
            ),
            'category' => array(
                'default'           => '',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'featured' => array(
                'default'           => '',
                'sanitize_callback' => 'sanitize_text_field',
            ),
        ),
    ));

    register_rest_route( 'mge/v1', '/gallery', array(
        'methods'             => 'GET',
        'callback'            => 'mge_api_get_gallery',
        'permission_callback' => '__return_true',
        'args'                => array(
            'per_page' => array(
                'default'           => 20,
                'sanitize_callback' => 'absint',
            ),
            'page' => array(
                'default'           => 1,
                'sanitize_callback' => 'absint',
            ),
            'category' => array(
                'default'           => '',
                'sanitize_callback' => 'sanitize_text_field',
            ),
            'project_id' => array(
                'default'           => '',
                'sanitize_callback' => 'absint',
            ),
        ),
    ));

    // Contact form submission
    register_rest_route( 'mge/v1', '/contact', array(
        'methods'             => 'POST',
        'callback'            => 'mge_api_submit_contact',
        'permission_callback' => '__return_true',
    ));
});

/**
 * Services endpoint callback.
 */
function mge_api_get_services( WP_REST_Request $request ) {
    $per_page = $request->get_param( 'per_page' );
    $page     = $request->get_param( 'page' );

    $query = new WP_Query( array(
        'post_type'      => 'mge_service',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        'post_status'    => 'publish',
        'meta_key'       => 'service_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'ASC',
    ));

    $services = array();
    foreach ( $query->posts as $post ) {
        $fields = get_fields( $post->ID );
        $services[] = array(
            'id'                => $post->ID,
            'title'             => $post->post_title,
            'slug'              => $post->post_name,
            'description'       => apply_filters( 'the_content', $post->post_content ),
            'excerpt'           => $post->post_excerpt,
            'icon'              => $fields['service_icon'] ?? 'settings',
            'short_description' => $fields['service_short_description'] ?? '',
            'features'          => array_map( function ( $item ) {
                return $item['feature_text'] ?? '';
            }, $fields['service_features'] ?? array() ),
            'display_order'     => (int) ( $fields['service_order'] ?? 0 ),
            'featured_image'    => get_the_post_thumbnail_url( $post->ID, 'large' ) ?: null,
        );
    }

    return new WP_REST_Response( array(
        'data'  => $services,
        'total' => (int) $query->found_posts,
        'pages' => (int) $query->max_num_pages,
        'page'  => $page,
    ), 200 );
}

/**
 * Projects endpoint callback.
 */
function mge_api_get_projects( WP_REST_Request $request ) {
    $per_page = $request->get_param( 'per_page' );
    $page     = $request->get_param( 'page' );
    $category = $request->get_param( 'category' );
    $featured = $request->get_param( 'featured' );

    $args = array(
        'post_type'      => 'mge_project',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    );

    // Filter by category
    if ( ! empty( $category ) ) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'project_category',
                'field'    => 'slug',
                'terms'    => $category,
            ),
        );
    }

    // Filter by featured
    if ( $featured === 'true' ) {
        $args['meta_query'] = array(
            array(
                'key'     => 'project_featured',
                'value'   => '1',
                'compare' => '=',
            ),
        );
    }

    $query = new WP_Query( $args );

    $projects = array();
    foreach ( $query->posts as $post ) {
        $fields = get_fields( $post->ID );

        // Process gallery
        $gallery = array();
        if ( ! empty( $fields['project_gallery'] ) && is_array( $fields['project_gallery'] ) ) {
            foreach ( $fields['project_gallery'] as $image ) {
                $gallery[] = array(
                    'id'        => $image['id'] ?? 0,
                    'url'       => $image['url'] ?? '',
                    'alt'       => $image['alt'] ?? '',
                    'thumbnail' => $image['sizes']['thumbnail'] ?? '',
                    'medium'    => $image['sizes']['medium'] ?? '',
                    'large'     => $image['sizes']['large'] ?? '',
                );
            }
        }

        // Get categories
        $terms = wp_get_post_terms( $post->ID, 'project_category', array( 'fields' => 'names' ) );

        $projects[] = array(
            'id'             => $post->ID,
            'title'          => $post->post_title,
            'slug'           => $post->post_name,
            'description'    => apply_filters( 'the_content', $post->post_content ),
            'excerpt'        => $post->post_excerpt,
            'category'       => ! is_wp_error( $terms ) ? ( $terms[0] ?? '' ) : '',
            'categories'     => ! is_wp_error( $terms ) ? $terms : array(),
            'location'       => $fields['project_location'] ?? '',
            'year'           => $fields['project_year'] ?? '',
            'client'         => $fields['project_client'] ?? '',
            'value'          => $fields['project_value'] ?? '',
            'scope'          => $fields['project_scope'] ?? '',
            'status'         => $fields['project_status'] ?? 'completed',
            'featured'       => (bool) ( $fields['project_featured'] ?? false ),
            'gallery'        => $gallery,
            'featured_image' => get_the_post_thumbnail_url( $post->ID, 'large' ) ?: null,
            'date'           => $post->post_date,
        );
    }

    return new WP_REST_Response( array(
        'data'  => $projects,
        'total' => (int) $query->found_posts,
        'pages' => (int) $query->max_num_pages,
        'page'  => $page,
    ), 200 );
}

/**
 * Gallery endpoint callback.
 */
function mge_api_get_gallery( WP_REST_Request $request ) {
    $per_page   = $request->get_param( 'per_page' );
    $page       = $request->get_param( 'page' );
    $category   = $request->get_param( 'category' );
    $project_id = $request->get_param( 'project_id' );

    $args = array(
        'post_type'      => 'mge_gallery',
        'posts_per_page' => $per_page,
        'paged'          => $page,
        'post_status'    => 'publish',
        'meta_key'       => 'gallery_order',
        'orderby'        => 'meta_value_num',
        'order'          => 'ASC',
    );

    if ( ! empty( $category ) ) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'gallery_category',
                'field'    => 'slug',
                'terms'    => $category,
            ),
        );
    }

    if ( ! empty( $project_id ) ) {
        $args['meta_query'] = array(
            array(
                'key'     => 'gallery_project_link',
                'value'   => $project_id,
                'compare' => '=',
            ),
        );
    }

    $query = new WP_Query( $args );

    $gallery_items = array();
    foreach ( $query->posts as $post ) {
        $fields = get_fields( $post->ID );
        $image  = $fields['gallery_image'] ?? null;

        $gallery_items[] = array(
            'id'            => $post->ID,
            'title'         => $post->post_title,
            'caption'       => $fields['gallery_caption'] ?? '',
            'image'         => $image ? array(
                'url'       => $image['url'] ?? '',
                'alt'       => $image['alt'] ?? '',
                'width'     => $image['width'] ?? 0,
                'height'    => $image['height'] ?? 0,
                'thumbnail' => $image['sizes']['thumbnail'] ?? '',
                'medium'    => $image['sizes']['medium'] ?? '',
                'large'     => $image['sizes']['large'] ?? '',
            ) : null,
            'project_id'    => $fields['gallery_project_link'] ?? null,
            'display_order' => (int) ( $fields['gallery_order'] ?? 0 ),
            'category'      => wp_get_post_terms( $post->ID, 'gallery_category', array( 'fields' => 'names' ) ),
        );
    }

    return new WP_REST_Response( array(
        'data'  => $gallery_items,
        'total' => (int) $query->found_posts,
        'pages' => (int) $query->max_num_pages,
        'page'  => $page,
    ), 200 );
}

/**
 * Contact form submission endpoint.
 */
function mge_api_submit_contact( WP_REST_Request $request ) {
    $body = $request->get_json_params();

    $name    = sanitize_text_field( $body['name'] ?? '' );
    $email   = sanitize_email( $body['email'] ?? '' );
    $phone   = sanitize_text_field( $body['phone'] ?? '' );
    $subject = sanitize_text_field( $body['subject'] ?? '' );
    $message = sanitize_textarea_field( $body['message'] ?? '' );

    // Validation
    if ( empty( $name ) || empty( $email ) || empty( $message ) ) {
        return new WP_REST_Response( array(
            'success' => false,
            'message' => 'Name, email, and message are required.',
        ), 400 );
    }

    if ( ! is_email( $email ) ) {
        return new WP_REST_Response( array(
            'success' => false,
            'message' => 'Invalid email address.',
        ), 400 );
    }

    // Send email to admin
    $admin_email = get_option( 'admin_email' );
    $mail_subject = '[MGE Engineering] Contact: ' . ( $subject ?: 'General Enquiry' );
    $mail_body = sprintf(
        "New contact form submission from MGE Engineering website.\n\n" .
        "Name: %s\nEmail: %s\nPhone: %s\nSubject: %s\n\nMessage:\n%s",
        $name, $email, $phone, $subject, $message
    );
    $headers = array(
        'Content-Type: text/plain; charset=UTF-8',
        'Reply-To: ' . $name . ' <' . $email . '>',
    );

    $sent = wp_mail( $admin_email, $mail_subject, $mail_body, $headers );

    if ( $sent ) {
        return new WP_REST_Response( array(
            'success' => true,
            'message' => 'Thank you for your enquiry. We will respond within 24 hours.',
        ), 200 );
    }

    return new WP_REST_Response( array(
        'success' => false,
        'message' => 'Failed to send message. Please try again or contact us directly.',
    ), 500 );
}

/**
 * Add cache headers to REST API responses for performance.
 */
add_filter( 'rest_post_dispatch', function ( $result, $server, $request ) {
    // Only cache GET requests for public endpoints
    if ( $request->get_method() !== 'GET' ) {
        return $result;
    }

    $route = $request->get_route();

    // Cache MGE custom endpoints and CPT endpoints for 5 minutes
    if ( strpos( $route, '/mge/v1/' ) !== false || strpos( $route, '/wp/v2/services' ) !== false || strpos( $route, '/wp/v2/projects' ) !== false || strpos( $route, '/wp/v2/gallery' ) !== false ) {
        $result->header( 'Cache-Control', 'public, max-age=300, s-maxage=600' );
    }

    return $result;
}, 10, 3 );
