<?php
namespace EMO_LA\Controllers;

use EMO_LA\Utils\EMO_LA_Request_Handler;
class EMO_LA_Admin_Save
{
    private $postID;
    private $nonce;
    private $logoData;
    private $imageID;

    public function __construct()
    {
        add_action( 'wp_ajax_emo_la_admin_save', array( $this, 'emo_la_admin_save' ) );
        add_action( 'wp_ajax_nopriv_emo_la_admin_save', array( $this, 'emo_la_admin_save' ) );
    }

    private function field_setter()
    {
        $this->postID = EMO_LA_Request_Handler::get_post( 'postID' );
        $this->nonce = EMO_LA_Request_Handler::get_post( 'nonce' );
        $this->logoData = EMO_LA_Request_Handler::get_post( 'logoData' );
        $this->imageID = EMO_LA_Request_Handler::get_post( 'imgID' );
    }

    private function nonce_checker()
    {
        if ( !wp_verify_nonce( $this->nonce, "emo_la_nonce".$this->postID)) {
            echo "<div  class='emo-notice danger'>The page has expired</div>";
            wp_die();
        }

    }

    public function emo_la_admin_save()
    {
        $this->field_setter();
        $this->nonce_checker();

        $savedData = json_decode(stripslashes(get_post_meta($this->postID, EMO_LA_LOGO_DATA, true)),true );
        $logoData = json_decode(stripslashes($this->logoData), true );

        if($savedData){
            $savedData[$this->imageID] = $logoData;
        }else{
            $savedData = array($this->imageID => $logoData);
        }
        $updateMeta = update_post_meta($this->postID, EMO_LA_LOGO_DATA, stripslashes(json_encode($savedData)));
        if($updateMeta){
            echo "<div class='emo-notice success'>Congratulations, the logo data has been successfully updated.</div>";
        }else{
            echo "<div class='emo-notice danger'>Sorry, an error is occurred in updating process.</div>";
        }
        wp_die();
    }
}