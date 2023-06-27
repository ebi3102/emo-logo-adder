<?php
namespace EMO_LA\Controllers;

class EMO_LA_Add_To_Cart
{
    private $parentProductID;
    private $printedProductID;

    public function __construct()
    {
        add_action('woocommerce_add_to_cart', array($this, 'add_to_cart_printed_product'));
    }

    // Scenarios:
    // 1- the parent is not in the cart so we ignore to add printed to the cart
    // 2- the parent is in the cart and the cookies have been setted, therefore, add printed product in the numbers that are setted
    // In each referesh the cookies must be nusetted
    public function add_to_cart_printed_product()
    {
        global $woocommerce;
        $this->field_setter();
        if(!$this->essential_checker()){
            $this->unset_cookie();
            return;
        }
            
        
        $foundParent = false;
        $foundPinted = false;       
        //check if product already in cart
        if ( sizeof( WC()->cart->get_cart() ) > 0 ) {
            foreach ( WC()->cart->get_cart() as $cart_item_key => $values ) {
                $_product = $values['data'];
                if ( $_product->id == $this->parentProductID )
                    $foundParent = true;

                if($_product->id == $this->printedProductID)
                    $foundPinted = true;
            }

            if ( $foundParent && !$foundPinted )
                WC()->cart->add_to_cart( $this->printedProductID );
        }
        echo "<pre>";
        var_dump(sizeof(WC()->cart->get_cart()));
        echo "</pre>";
        echo "<pre>";
        var_dump($foundParent);
        echo "</pre>";
        // else {
        //     // if no products in cart, add it
        //     WC()->cart->add_to_cart( $product_id );
        // }

        $this->unset_cookie();
        

    }

    private function field_setter()
    {
        $this->parentProductID = $_COOKIE["printedProductParent"];
        $this->printedProductID = $_COOKIE["printedProduct"];
    }

    private function unset_cookie()
    {
        setcookie("printedProductParent", "", time() - 3600);
        setcookie("printedProduct", "", time() - 3600);
    }

    private function essential_checker()
    {
        if($this->printedProductID && $this->parentProductID){
            return true;
        }else{
            return false;
        }
    }
}