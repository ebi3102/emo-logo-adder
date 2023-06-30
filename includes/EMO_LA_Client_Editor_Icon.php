<?php
/**
 * Inject Canvas editor Icon to single product in client side
 */
namespace EMO_LA;

use EMO_LA\Utils\EMO_LA_Inject_JS_Client;
use EMO_LA\Utils\EMO_LA_Icons_Render;
class EMO_LA_Client_Editor_Icon
{
    public function __construct()
    {
//        add_action('woocommerce_before_single_product_summary', array($this, 'editor_template'), 30);
        add_action('woocommerce_after_single_product_summary', array($this, 'editor_template'), 5);
        
        
    }

    public function editor_template()
    { 
        global $post;
        if(!get_post_meta( $post->ID, EMO_LA_LOGO_DATA, true ))
            return;
        $uploadedLogoData = new EMO_LA_Inject_JS_Client($post, 'client-scripts');
        $uploadedLogoData->render();
        //Add Logo and Icons detailes
        $canvasDate = new EMO_LA_Icons_Render($post, 'client-scripts');
        echo $canvasDate->render();

        $logoData = json_decode( get_post_meta( $post->ID, EMO_LA_LOGO_DATA, true ));
        ?>
        <div class="emo-editor-icon">
            <img id="clientLogoUploader" src="<?php echo EMO_LA_URI."assets/icons/active-icon.svg" ?>" alt="">
            <div>
                <div id="saveBtn" class="emo-btn primary client-save">save</div>
            
            </div>
        </div>

        <?php //Modal ?>
        <div id="popupScreenLocker" class="popup-screen-locker">
            <div id="popupUploadContainer" class="popup-upload-container">
                <div>
                    <div id="emoClose" class="close-icon">&#10005;</div>
                </div>
                <div class="upload-container">
                    <div>
                        <div id="defaultLogoContainer" class="default-logo-container">
                            <img src="<?php echo $logoData->src ?>" alt="">
                        </div>
                    </div>
                    <div id="dropContainer" class="logo-uploader"> &#43;</div>
                </div>
                <div class="upload-text-container">
                    <div>
                        <p 
                            id="setdefaultLogo" 
                            class="emo-btn primary set-to-editor"
                            logo-source = "<?php echo $logoData->src ?>"
                        >
                            Set default logo
                        </p>
                    </div>
                    <div>
                        <p id="UploadLogo" class="emo-btn primary upload-logo">Upload your logo</p>
                        <div id="noticeContainer"></div>
                    </div>
                </div>
            </div>
            <div id="setCustomLogoContainer" class="set-custom-logo-container" >
                <div>
                    <div class="close-icon">&#10005;</div>
                </div>
                <div id="CustomLogoParts" class="upload-container"></div>
            </div>
        </div>
    <?php }

}