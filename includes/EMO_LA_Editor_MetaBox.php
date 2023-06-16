<?php

//Save image edit data into this metabox
namespace EMO_LA;

use EMO_LA\Utils\EMO_LA_Icons_Render;
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
            ?>
            <div class="popup-screen-locker">
                <div class="popup-editor-container">
                    <div>
                        <?php 
                        // Add Icons and logo data as a script tag
                        $canvasDate = new EMO_LA_Icons_Render($post);
                        echo $canvasDate->render();
                        ?>
                        <canvas
                            id="canvas"
                            width="500"
                            height="500"
                            style="border:1px solid #000000;">
                        </canvas>
                        <div class="btn-container">
                        <div id="emoUploadlogo" class="emo-btn primary">Upload new logo</div>
                            <div
                                id="emoSaveEditor" 
                                class="emo-btn success" 
                                data-nonce="<?php echo wp_create_nonce("emo_la_nonce".$post->ID); ?>"
                                data_id = "<?php echo $post->ID ?>"
                                data_url = "<?php echo admin_url( 'admin-ajax.php' ) ?>"
                            >Save</div>
                        </div>
                    </div>
                </div>
            </div><!--.popup-screen-locker-->

        <?php 
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