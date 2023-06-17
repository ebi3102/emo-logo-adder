<?php
/**
 * Inject Canvas editor Icon to single product in client side
 */
namespace EMO_LA;

class EMO_LA_Client_Editor_Icon
{
    public function __construct()
    {
        // add_filter( 'woocommerce_single_product_image_thumbnail_html', array($this, 'editor_template'), 10, 2);
        // add_action('woocommerce_before_single_product_summary', array($this, 'editor_template'), 30);
        add_action('woocommerce_product_thumbnails', array($this, 'editor_template'), 20);
        
        
    }

    public function editor_template()
    { ?>
        <div class="emo-editor-icon">
            <img id="ClientLogoUploader" src="<?php echo EMO_LA_URI."assets/icons/active-icon.svg" ?>" alt="">
        </div>
    <?php }

}