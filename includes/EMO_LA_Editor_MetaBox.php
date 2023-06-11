<?php

//Save image edit data into this metabox
namespace EMO_LA;
class EMO_LA_Editor_MetaBox
{
    public function __construct()
    {
        add_action( 'admin_init', array($this, 'add_metabox') );
        add_action( 'save_post', array($this, 'save_metabox'), 10, 2 );
    }
    public function add_metabox()
    {
        add_meta_box(
            'emo_la_image_editor', // metabox ID
            __( 'Image Editor', 'emo_logo_adder' ), // title
            array($this, 'metabox_callback' ), // callback function
            'product', // post type or post types in array
            'normal', // position (normal, side, advanced)
            'default' // priority (default, low, high, core)
        );
    }

    public function metabox_callback($post)
    {
        $btnText = __("Add logo editor setting", 'emo_logo_adder');
        if(has_post_thumbnail($post)){
            echo "<button id='addEditorPopUp'>{$btnText}</button>";
        }else{
            $commentText = __('Before adding any editor settings set a feature image for this product', 'emo_logo_adder');
            echo "<button id='addEditorPopUp' disabled>{$btnText}</button>";
            echo "<div>{$commentText}</div>";
        }
        
        
    }

    public function save_metabox($post_id, $post)
    {
        
    }
}