<?php
namespace EMO_LA\Controllers;

class EMO_LA_Add_To_Cart
{
    private $parentProductID;
    private $printedProductID;
    private $qtyNumbere;

    public function __construct()
    {
        add_action('woocommerce_add_to_cart', array($this, 'add_to_cart_printed_product'));
        add_action('init', array($this, 'unset_cookie'));
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
                    $printed_cart_item_key = $cart_item_key;
                    $printedQty = $values['quantity'];
            }

            if ( $foundParent){
                if($foundPinted){
                    if($this->qtyNumbere){
                        WC()->cart->set_quantity( $printed_cart_item_key, $printedQty+$this->qtyNumbere );
                    }else{
                        WC()->cart->set_quantity( $printed_cart_item_key, $printedQty+1 );
                    }
                }else{
                    if($this->qtyNumbere){
                        WC()->cart->add_to_cart( $this->printedProductID , $this->qtyNumbere );
                    }else{
                        WC()->cart->add_to_cart( $this->printedProductID );
                    }
                }
            }
                
        }
        $this->unset_cookie();  
    }

    private function field_setter()
    {
        $this->parentProductID = $_COOKIE["printedProductParent"];
        $this->printedProductID = $_COOKIE["printedProduct"];
        $this->qtyNumbere = $_COOKIE['qtyNumbere'];
    }

    public function unset_cookie()
    {
        setcookie("printedProductParent", "", time() - 3600);
        setcookie("printedProduct", "", time() - 3600);
        setcookie("qtyNumbere", "", time() - 3600);
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