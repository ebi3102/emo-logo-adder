<?php
namespace EMO_LA\Utils;

class EMO_LA_Inject_JS_Client
{
    private $postObject;
    private $scriptName;

    //Ajax url
    // action
    // image date: image - user data - date and time

    public function __construct($postObject, $scriptName)
    {
        $this->postObject = $postObject;
        $this->scriptName = $scriptName;
    }

    private function ajax_data()
    {
        return array(
            'ajax_url'  => admin_url( 'admin-ajax.php' ),
            'action'    => 'emo_la_client_logo_upload',
            'nonce'     => wp_create_nonce("emo_la_nonce".$this->postObject->ID),
            'loadingSrc' => EMO_LA_URI."assets/images/loading.gif",
            'postID' => $this->postObject->ID
        );
    }

    private function canvas_data()
    {
        global $canvasData;
        return array(
            "logoData" => get_post_meta( $this->postObject->ID, EMO_LA_LOGO_DATA, true ),
            "canvasData" =>$canvasData
        );
    }

    private function options_data()
    {
        $monochrome = wc_get_product( get_option('monochrome_print') );
        $bichrome = wc_get_product( get_option('bichrome_print') );
        return array(
            "monochropPrint" => array(
                "id"=> get_option('monochrome_print'),
                "title"=> $monochrome->get_name(),
                "price" =>$monochrome->get_price(),
                "priceHTML" => $monochrome->get_price_html()

            ),
            "bichromPrint" => array(
                "id"=> get_option('bichrome_print'),
                "title"=> $bichrome->get_name(),
                "price" =>$bichrome->get_price(),
                "priceHTML" => $bichrome->get_price_html()
            )
        );
    }

    public function render()
    {
        $data = array_merge(
            $this->ajax_data(), 
//            $this->canvas_data(),
            $this->options_data()
        );
        wp_localize_script( $this->scriptName, 'uploadedLogoData', $data);
        
    }


}