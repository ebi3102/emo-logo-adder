<?php 
namespace EMO_LA\Controllers;

use EMO_LA\Utils\EMO_LA_Request_Handler;
class EMO_LA_Add_To_Order
{
    private $emoLogoData;
    private $imagesData;

    public function __construct()
    {
        add_filter('woocommerce_checkout_create_order', array($this, 'emo_add_data_to_order'), 10, 1);
    }

    private function field_setter()
    {
        $this->emoLogoData = EMO_LA_Request_Handler::get_post( 'logoData' );
    }

    public function emo_add_data_to_order($order) {
        $this->field_setter();
        if (isset($this->emoLogoData)) {

            $order_data = json_decode(stripslashes($this->emoLogoData),true );
            $logosData = [];
            $images = [];
            foreach ($order_data as $postID=>$logosID){
                $logosData[$postID] = [];
                foreach ($logosID as $key=>$item){
                    $logosData[$postID][$key] = $item['logoData'];
                    $images[] = $item['newImage'];
                }
            }
            $myData = sanitize_text_field(json_encode($logosData));
            $order->update_meta_data(EMO_LA_ORDER_META, $myData);

            $targetDirectory = EMO_LA_CREATED_DIR. '/';
            $imgUrls = [];
            foreach ($images as $index=>$imgData){
                $imageData = str_replace('data:image/png;base64,', '', $imgData);
                $imageData = str_replace(' ', '+', $imageData);
                $imageData = base64_decode($imageData);
                $targetFilename = $targetDirectory . 'image_' . $index .'_'.time(). '.png';
                $targetFileUrl = EMO_LA_CREATED_URI . 'image_' . $index .'_'.time(). '.png';
                // Save the image data to the target file
                file_put_contents($targetFilename, $imageData);
                $imgUrls[] = $targetFileUrl;
            }
            $urlsData = sanitize_text_field(json_encode($imgUrls));
            $order->update_meta_data('emo_editor_logo_order', $urlsData);

            $order->save();
        }
        return $order;
    }
}