<?php 
/**
 * EMO_LA Enqueue JS and Css files
 *
 * @package EMO_LA
 * @since   1.0.0
 */
namespace EMO_LA;
class EMO_LA_Enqueue
{

    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_styles'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));

        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_styles'));

        add_action('wp_enqueue_scripts', array($this, 'client_enqueue_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'client_enqueue_styles'));

    }

    public function enqueue_styles($hook)
    {
        wp_register_style('emo_styles',EMO_LA_URI.'assets/css/styles.css', array(), '1.0.0', 'all');
        if($hook == 'post.php' || (function_exists( 'is_product' ) && is_product())){
            wp_enqueue_style('emo_styles');
        }
        
    }

    public function admin_enqueue_scripts($hook)
    {
        
        if($hook == 'post.php'){
            wp_enqueue_script( 'emo-image-editor', EMO_LA_URI.'assets/js/adminEditor.js',array(),'1.0.0', true );
            wp_enqueue_script( 'admin-scripts', EMO_LA_URI.'assets/js/scripts.admin.js',array('jquery'),'1.0.0', true );
            wp_localize_script( 'emo-image-editor', 'wp_pageviews_ajax', array(
                'ajax_url' => admin_url( 'admin-ajax.php' )
              ) );
        }

    }

    public function admin_enqueue_styles($hook)
    {
        wp_register_style('admin_styles',EMO_LA_URI.'assets/css/styles.admin.css', array(), '1.0.0', 'all');
        if($hook == 'post.php'){
            wp_enqueue_style('admin_styles');
        }
    }

    public function client_enqueue_styles($hook)
    {
        wp_register_style('client_styles',EMO_LA_URI.'assets/css/styles.client.css', array(), '1.0.0', 'all');
        if ( function_exists( 'is_product' ) && is_product() ){
            wp_enqueue_style('client_styles');
        }
    }

    public function client_enqueue_scripts($hook)
    {
        wp_register_script('client-scripts', EMO_LA_URI.'assets/js/clientEditor.js',array('jquery'),'1.0.0', true);
        if ( function_exists( 'is_product' ) && is_product() ){
            wp_enqueue_script('client-scripts');
        }

    }

}