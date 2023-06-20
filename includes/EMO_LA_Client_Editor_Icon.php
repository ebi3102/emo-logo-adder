<?php
/**
 * Inject Canvas editor Icon to single product in client side
 */
namespace EMO_LA;

use EMO_LA\Utils\EMO_LA_Inject_JS_Client;
class EMO_LA_Client_Editor_Icon
{
    public function __construct()
    {
        // add_filter( 'woocommerce_single_product_image_thumbnail_html', array($this, 'editor_template'), 10, 2);
        // add_action('woocommerce_before_single_product_summary', array($this, 'editor_template'), 30);
        add_action('woocommerce_product_thumbnails', array($this, 'editor_template'), 20);
        
        
    }

    public function editor_template()
    { 
        global $post;
        $uploadedLogoData = new EMO_LA_Inject_JS_Client($post, 'client-scripts');
        $uploadedLogoData->render();
        ?>
        <div class="emo-editor-icon">
            <img id="clientLogoUploader" src="<?php echo EMO_LA_URI."assets/icons/active-icon.svg" ?>" alt="">
        </div>

        <?php //Modal ?>
        <div id="popupScreenLocker" class="popup-screen-locker">
            <div id="popupUploadContainer" class="popup-upload-container">
                <div>
                    <div id="emoClose" class="close-icon">&#10005;</div>
                </div>
                <div class="upload-container">
                    <div>
                        <div class="defualt-logo-container">
                            <img src="<?php echo EMO_LA_URI."assets/images/logo.png" ?>" alt="">
                        </div>
                    </div>
                    <div id="dropContainer" class="logo-uploader"> &#43;</div>
                </div>
                <div class="upload-text-container">
                    <div><p id="setDefualtLogo" class="emo-btn primary">Set defualt logo</p></div>
                    <div>
                        <p id="UploadLogo" class="emo-btn primary upload-logo">Upload your logo</p>
                        <div id="noticeContainer"></div>
                    </div>
                </div>
            </div>
            <div id="setCustomLogoContainer" class="set-custom-logo-container">
                <div>
                    <div class="close-icon">&#10005;</div>
                </div>
                <div id="CustomLogoParts" class="upload-container"></div>
            </div>
        </div>
    <?php }

}