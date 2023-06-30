<?php

namespace EMO_LA;

class EMO_LA_Admin_Order
{

    public function __construct()
    {
        add_action( 'woocommerce_admin_order_data_after_billing_address', array($this,'template_order_admin'), 10, 1 );
    }

    public function template_order_admin($order)
    {
        $imagesUrl = json_decode(get_post_meta($order->get_id(), 'emo_editor_logo_order', true ));
        echo "<div style='display: flex'>";
        foreach ($imagesUrl as $url){ ?>
            <div style="margin: 10px">
                <img src="<?php echo $url ?>" alt="">
            </div>
        <?php }
        echo "</div>";
    }



}