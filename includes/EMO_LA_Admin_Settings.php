<?php
namespace EMO_LA;

class EMO_LA_Admin_Settings
{
    public function __construct()
    {
        add_action( 'admin_menu', array($this, 'emo_la_add_admin_page') );
    }

    public function emo_la_add_admin_page()
    {
        add_menu_page( __( 'Logo Editor Settings', 'emo_la' ), __( 'Logo Editor', 'emo_la' ), 'manage_options', '', array($this, 'emo_la_create_page'), 'dashicons-image-rotate-left', 110 );
        //Generate Sunset Admin Sub Pages
        add_submenu_page('emo_la_slug', __( 'Logo Editor Settings', 'emo_la' ), __( 'Settings', 'emo_la' ) , 'manage_options' , 'emo_la_slug' , array($this, 'emo_la_create_page'));

    }

    public function emo_la_create_page()
    {
	    require_once 'templates/admin-settings.php';
    }
}