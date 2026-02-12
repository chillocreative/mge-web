<?php
/**
 * MGE Headless Theme - Main Template
 *
 * This file exists only to satisfy WordPress theme requirements.
 * All frontend rendering is handled by the Next.js application.
 *
 * @package MGE_Headless
 */

// Redirect to frontend
$frontend_url = defined( 'MGE_FRONTEND_URL' ) ? MGE_FRONTEND_URL : 'http://localhost:3000';
wp_redirect( $frontend_url, 301 );
exit;
