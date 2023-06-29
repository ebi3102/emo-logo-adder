<?php 
namespace EMO_LA\Controllers;

use EMO_LA\Utils\EMO_LA_Request_Handler;
class EMO_LA_Add_To_Order
{
    private $emoEditorData;

    public function __construct()
    {
        add_action('woocommerce_checkout_create_order', array($this, 'add_data_to_order'), 10, 2);
    }

    private function field_setter()
    {
        $this->emoEditorData = EMO_LA_Request_Handler::get_post( 'emoEditorData' );
    }

    public function add_data_to_order($order, $data) {
        if (isset($this->emoEditorData)) {
            $myData = sanitize_text_field($this->emoEditorData);
            $order->update_meta_data(EMO_LA_ORDER_META, $myData);
            $order->save();
        }
    }
}