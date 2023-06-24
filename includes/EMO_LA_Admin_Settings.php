<?php
namespace EMO_LA;

class EMO_LA_Admin_Settings
{
    public function __construct()
    {
        add_action( 'admin_menu', array($this, 'emo_la_add_admin_page') );
        add_action('admin_init' , array($this,'emo_la_custom_settings'));
    }

    public function emo_la_add_admin_page()
    {
        add_menu_page( __( 'Logo Editor Settings', 'emo_la' ), __( 'Logo Editor', 'emo_la' ), 'manage_options', 'emo_la_slug', array($this, 'emo_la_create_page'), 'dashicons-image-rotate-left', 110 );
        //Generate Sunset Admin Sub Pages
        add_submenu_page('emo_la_slug', __( 'Logo Editor Settings', 'emo_la' ), __( 'Settings', 'emo_la' ) , 'manage_options' , 'emo_la_slug' , array($this, 'emo_la_create_page'));

    }

    public function emo_la_create_page()
    {
	    require_once 'templates/admin-settings.php';
    }

    public function emo_la_custom_settings()
    {
        add_settings_section('emo_la_printed_settings', __( 'Set printed product', 'emo_la' ), array($this,'emo_la_printed_settings_callback'), 'emo_la_slug');

        register_setting('emo_la_product_settings', 'monochrome_print');
	    add_settings_field('emo_la_monochrome_print', __( 'Set the monochrome product ', 'emo_la' ), array($this,'emo_la_monochrome_print_callback'), 'emo_la_slug', 'emo_la_printed_settings');


        register_setting('emo_la_product_settings', 'bichrome_print');
        add_settings_field('emo_la_bichrome_print', __( 'Set the bichrome product ', 'emo_la' ), array($this,'emo_la_bichrome_print_callback'), 'emo_la_slug', 'emo_la_printed_settings');
        
    }

    public function emo_la_printed_settings_callback(){}

    public function emo_la_monochrome_print_callback(){
        $options = get_option('monochrome_print');
	    echo '<lable for="monochrome_print"><input type= "text" id="monochrome_print" name="monochrome_print" value="'.$options.'" placeholder="'.__('Product id','emo_la').'"></lable>';
        echo "<p>".__('Put the id of the product that has been assigned for monochrom print.','emo_la')."</p>";

    }

    public function emo_la_bichrome_print_callback(){
        $options = get_option('bichrome_print');
	    echo '<lable for="bichrome_print"><input type= "text" id="bichrome_print" name="bichrome_print" value="'.$options.'" placeholder="'.__('Product id','emo_la').'"></lable>';
        echo "<p>".__('Put the id of the product that has been assigned for bichrom print.','emo_la')."</p>";
    }
}