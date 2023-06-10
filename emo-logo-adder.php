<?php
/**
 * @package EMO_LA
 * Plugin Name: Emo Logo Adder
 * Plugin URI:
 * Description: A powerful system adding logo and othe images to product image to customize product for customer
 * Author: Ebrahim Moeini
 * Author URI: https://emoeini.com
 * Version: 1.0.0
 * Requires at least: 5.8
 * Tested up to: 6.2
 * WC requires at least: 5.5.0
 * WC tested up to: 7.5.1
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: emo_logo_adder
 * Domain Path: /languages
 **/

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

$upload_base = wp_upload_dir();

// define URIs and directories
define('EMO_LA_URI', plugin_dir_url( __FILE__ ));
define('EMO_LA_DIR', __DIR__ );
define('EMO_LA_CREATED_DIR', $upload_base['basedir'] . '/emo_la/CreatedFiles/');
define('EMO_LA_UPLOAD_DIR', $upload_base['basedir'] . '/emo_la/uploadedFiles/');
define('EMO_LA_CREATED_URI', $upload_base['baseurl'] . '/emo_la/CreatedFiles/');
define('EMO_LA_UPLOAD_URI', $upload_base['baseurl'] . '/emo_la/uploadedFiles/');

if ( ! function_exists( 'emo_la_init' ) ) {
	add_action( 'plugins_loaded', 'emo_la_init', 11 );

	function emo_la_init() {

        if ( ! function_exists( 'WC' ) || ! version_compare( WC()->version, '5.5', '>=' ) ) {
			add_action( 'admin_notices', 'emo_la_notice_wc' );
			return;
		}

        //Check and create essential directories 
        if (!file_exists(EMO_LA_CREATED_DIR))
            mkdir(EMO_LA_CREATED_DIR, 0777, true);
        if (!file_exists(EMO_LA_UPLOAD_DIR))
            mkdir(EMO_LA_UPLOAD_DIR, 0777, true);
        
        require_once EMO_LA_DIR . '/vendor/autoload.php';

        // Include the main EMO_LA class.
        if ( ! class_exists( 'EMO_LA', false ) ) {
            include_once dirname( WC_PLUGIN_FILE ) . '/includes/EMO_LA.php';
        }

        /**
         * Returns the main instance of EMO_LA.
         *
         * @since  1.0.0
         * @return EMO_LA
         */
        function emo_la() {
            return EMO_LA::instance();
        }
        
        /**
         * Load the plugin text domain for translation.
         */
        add_action( 'init', 'emo_la_load_textdomain' );

		if ( ! function_exists( 'emo_la_load_textdomain' )){
            function emo_la_load_textdomain() {
                load_plugin_textdomain( 'emo_logo_adder', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
            }
		}
    }
} else {
	add_action( 'admin_notices', 'emo_la_notice_faulty' );
}

if ( ! function_exists( 'emo_la_notice_wc' ) ) {
	function emo_la_notice_wc() {
		?>
        <div class="error">
            <p><strong>Emo Logo Adder</strong> requires WooCommerce version 3.0 or greater.</p>
        </div>
		<?php
	}
}

if ( ! function_exists( 'emo_la_notice_faulty' ) ) {
	function emo_la_notice_faulty() {
		?>
        <div class="error">
            <p>Seems there is an error in installation of <strong>Emo Logo Adder</strong>. Please
                delete the plugin an install it again.</p>
        </div>
		<?php
	}
}