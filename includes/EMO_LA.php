<?php
/**
 * EMO_LA setup
 *
 * @package EMO_LA
 * @since   1.0.0
 */
defined( 'ABSPATH' ) || exit;

use EMO_LA\EMO_LA_Enqueue;
use EMO_LA\EMO_LA_Editor_MetaBox;
use EMO_LA\EMO_LA_Client_Editor_Icon;
use EMO_LA\Controllers\EMO_LA_Admin_Save;
use EMO_LA\Controllers\EMO_LA_Logo_Uploader;
use EMO_LA\EMO_LA_Admin_Settings;
use EMO_LA\Controllers\EMO_LA_Add_To_Cart;

final class EMO_LA
{
    /**
	 * The single instance of the class.
	 *
	 * @var EMO_LA
	 * @since 1.0.0
	 */
	protected static $_instance = null;

    /**
	 * Main EMO_LA Instance.
	 *
	 * Ensures only one instance of EMO_LA is loaded or can be loaded.
	 *
	 * @since 2.1
	 * @static
	 * @return EMO_LA - Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}


    private function classes_init()
    {
        new EMO_LA_Enqueue();
        new EMO_LA_Editor_MetaBox();
		new EMO_LA_Admin_Save();
		new EMO_LA_Client_Editor_Icon();
		new EMO_LA_Logo_Uploader();
		new EMO_LA_Admin_Settings();
		new EMO_LA_Add_To_Cart();
    }

    public function __construct()
    {
        $this->classes_init();
    }

}