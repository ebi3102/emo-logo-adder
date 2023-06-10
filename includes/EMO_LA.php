<?php
/**
 * EMO_LA setup
 *
 * @package EMO_LA
 * @since   1.0.0
 */
defined( 'ABSPATH' ) || exit;

use EMO_LA\EMO_LA_Enqueue;

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
	 * @see WC()
	 * @return WooCommerce - Main instance.
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

    }

    public function __construct()
    {
        $this->classes_init();
    }

}