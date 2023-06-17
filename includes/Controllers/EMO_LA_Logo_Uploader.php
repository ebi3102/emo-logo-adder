<?php

namespace EMO_LA\Controllers;

class EMO_LA_Logo_Uploader
{
    private $nonce;

    public function __construct()
    {
        add_action( 'wp_ajax_emo_la_client_logo_upload', array( $this, 'emo_la_client_logo_upload' ) );
        add_action( 'wp_ajax_nopriv_emo_la_client_logo_upload', array( $this, 'emo_la_client_logo_upload' ) );
    }

    private function field_setter()
    {
        $this->nonce = EMO_LA_Request_Handler::get_post( 'nonce' );
    }

    private function nonce_checker()
    {
        if ( !wp_verify_nonce( $this->nonce, "emo_la_nonce".$this->postID)) {
            echo "<div style='text-align:center'>The page has expired</div>";
            wp_die();
        }

    }

    public function emo_la_client_logo_upload()
    {
        $this->field_setter();
        $this->nonce_checker();

        echo "<div class='emo-notice success'>Congratulations, You connect with backend.</div>";
        // }else{
        //     echo "<div class='emo-notice danger'>Sorry, an error is occurred in updating process.</div>";
        // }
        wp_die();
    }
}