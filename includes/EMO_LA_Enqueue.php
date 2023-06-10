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
        add_action('admin_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_styles'));

        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));

    }

    public function enqueue_scripts($hook)
    {
        wp_enqueue_script( 'emo-image-editor', EMO_LA_URI.'assets/js/image-editor.js',array(),'1.0.0', true );
    }

    public function enqueue_styles($hook)
    {
        //do somethings
    }

}