<?php 
namespace EMO_LA\Controllers;

use EMO_LA\Utils\EMO_LA_Request_Handler;
class EMO_LA_Add_To_Order
{
    private $emoEditorData;

    public function __construct()
    {
        add_filter('woocommerce_checkout_create_order', array($this, 'emo_add_data_to_order'), 10, 1);
        
    }

    private function field_setter()
    {
        $this->emoEditorData = EMO_LA_Request_Handler::get_post( 'emoEditorData' );
    }

    public function emo_add_data_to_order($order) {
        $this->field_setter();
        if (isset($this->emoEditorData)) {
            $myData = sanitize_text_field($this->emoEditorData);
            $order->update_meta_data(EMO_LA_ORDER_META, $myData);
            $order->update_meta_data('test_order_data', json_encode($order->get_items()));
            $order->save();
        }
        return $order;
    }
}