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

        global $canvasData;
        echo "<div class='thumbnails-container'>";
        $this->thumbnails_template($post);
        echo "</div>";
        ?>
        <div id="popupScreenLocker" class="popup-screen-locker">
            <div id="popupEditorContainer" class="popup-editor-container" style="width:<?php echo $canvasData['width'].'px' ?>">
                <div>
                    <div id="emoClose" class="close-icon">&#10005;</div>
                    <?php
                    //Add Logo and Icons detailes
                    $canvasDate = new EMO_LA_Icons_Render($post, 'emo-image-editor');
                    echo $canvasDate->render();
                    ?>
                    <div id="canvasContainer"></div>
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
                    <div id="loadingImg" class="loading-img"><img src="<?php echo EMO_LA_URI.'assets/images/loading.gif'?>" alt=""></div>
                    <div class="notice-container" id="noticeContainer"></div>
                </div>
            </div>
        </div><!--.popup-screen-locker-->

        <?php
    }

    private function thumbnails_template($post)
    {
        if(has_post_thumbnail($post)){
            echo "<img data-id='".get_post_thumbnail_id()."' class='thumbnail-editor' src='".get_the_post_thumbnail_url($post)."'>";
        }
        $product = wc_get_product( $post->ID );
        $attachment_ids = $product->get_gallery_image_ids();

        if(count($attachment_ids) >0 ){
            foreach( $attachment_ids as $attachment_id ){
                $image_url = wp_get_attachment_url( $attachment_id );
                echo "<img data-id='".$attachment_id."' class='thumbnail-editor' src='". $image_url."'>";
            }
        }       
        
    }
}