<?php
/**
 * MGE Engineering Sdn Bhd - Production WordPress Configuration
 *
 * INSTRUCTIONS: Rename this file to wp-config.php on the production server.
 *
 * @package MGE-CMS
 */

// ============================================================
// DATABASE SETTINGS
// ============================================================
define( 'DB_NAME', 'mgeengco_mgewebsite' );
define( 'DB_USER', 'mgeengco_mgewebsite' );
define( 'DB_PASSWORD', 'h(vqt!5.}Sk+v=*X' );
define( 'DB_HOST', 'localhost' );
define( 'DB_CHARSET', 'utf8mb4' );
define( 'DB_COLLATE', '' );

// ============================================================
// AUTHENTICATION KEYS AND SALTS
// ============================================================
define( 'AUTH_KEY',          'N^o>LX6P+YOiE6hU,3pDn)t2_~,I|to%2;Lo_r[zYTKx|U46XPEq??{f<OsQKeN%' );
define( 'SECURE_AUTH_KEY',   'tq~<9q1QNxz?q:aD_<eEiC9zXe#n-/nhiJ5Za3+[3eq1*oQ^[|0ldwHwSB1>8xy}' );
define( 'LOGGED_IN_KEY',     'Fg5uy{9l/1Ve2y>JC=^#(7RJ*?!_VG-V@?[5a:UT^<PThp|~|vxLp?:Vt@{b9DT^' );
define( 'NONCE_KEY',         'B]a5byLR[Eb=ax-e,4bsS:VxlV]7txwP0F9]xPYO)cfT~Smd5!?Lq@wRe<g+Xf,~' );
define( 'AUTH_SALT',         '*{jhieB~OVf8TY9*4nC:_Ykkp5mv%arW26+FkXwI0L~yCrzFFhY?x~6h%<uP*I-[' );
define( 'SECURE_AUTH_SALT',  '=@R]Y2.2>=Ukz[7NAoW0_<3|l(4v3*I221!0dsK[t,pOf^JMeLYKF?_O:!2uqW;D' );
define( 'LOGGED_IN_SALT',    'O8)FfPqCCMY:~M}=X0,87|c<(tQg=O@Be;mU9y.}L5U;HrR|EZ6>,-/a{/AKmpqz' );
define( 'NONCE_SALT',        'o~%=nX4h*6:WJGX0kVmQJdeMP*34exbqTP6/B[a.>a>b7ojaXYlX)YtsKRp{o5-F' );

// ============================================================
// DATABASE TABLE PREFIX (must match local dev)
// ============================================================
$table_prefix = 'mge_';

// ============================================================
// HEADLESS CMS CONFIGURATION
// ============================================================

// Frontend URL (production)
define( 'MGE_FRONTEND_URL', 'https://mge-eng.com' );

// Default theme
define( 'WP_DEFAULT_THEME', 'twentytwentyfive' );

// ============================================================
// DEBUGGING (disabled in production)
// ============================================================
define( 'WP_DEBUG', false );
define( 'WP_DEBUG_LOG', false );
define( 'WP_DEBUG_DISPLAY', false );

// ============================================================
// SECURITY HARDENING
// ============================================================
define( 'DISALLOW_FILE_EDIT', true );
define( 'WP_POST_REVISIONS', 5 );
define( 'AUTOSAVE_INTERVAL', 120 );
define( 'EMPTY_TRASH_DAYS', 14 );

// ============================================================
// PERFORMANCE
// ============================================================
define( 'WP_MEMORY_LIMIT', '128M' );
define( 'WP_MAX_MEMORY_LIMIT', '256M' );

// ============================================================
// UPLOADS
// ============================================================
define( 'UPLOADS', 'wp-content/uploads' );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
    define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
