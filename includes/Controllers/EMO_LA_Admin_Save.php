<?php
namespace EMO_LA\Controllers;

use EMO_LA\Utils\EMO_LA_Request_Handler;
class EMO_LA_Admin_Save
{
    private $postID;
    private $nonce;
    private $logoData;

    public function __construct()
    {
        add_action( 'wp_ajax_admin_save', array( $this, 'admin_save' ) );
        add_action( 'wp_ajax_nopriv_admin_save', array( $this, 'admin_save' ) );
    }

    private function field_setter()
    {
        $this->postID = EMO_LA_Request_Handler::get_post( 'postID' );
        $this->nonce = EMO_LA_Request_Handler::get_post( 'postID' );
        $this->logoData = EMO_LA_Request_Handler::get_post( 'logoData' );
    }

    private function nonce_checker()
    {
        if ( !wp_verify_nonce( $this->nonce, "emo_la_nonce".$this->postID)) {
            echo "<div class='table-chart-container' style='text-align:center'>The page has expired</div>";
            wp_die();
        }

    }

    public function admin_save()
    {
        $this->field_setter();
        $this->nonce_checker();

        echo $this->logoData;

    }
}