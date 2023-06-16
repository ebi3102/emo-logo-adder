<?php
/**
 * Inject Canvas editor to single product in client side
 */
namespace EMO_LA;

class EMO_LA_Client_Editor
{
    public function __construct()
    {
        add_filter( 'woocommerce_single_product_image_thumbnail_html', array($this, 'editor_template'), 10, 2);
    }

    public function editor_template()
    {
        echo "Canvas editor";
    }

}