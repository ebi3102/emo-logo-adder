<?php

namespace EMO_LA\Controllers;

use EMO_LA\Utils\EMO_LA_Request_Handler;

class EMO_LA_Logo_Uploader
{
    private $nonce;
    private $file;
    private $fileChecker;
    private $uploadPath;
    private $uploadUri;
    private $imgUrl;
    private $imgPath;
    private $imgExtension;
    private $imgName;

    public function __construct()
    {
        add_action( 'wp_ajax_emo_la_client_logo_upload', array( $this, 'emo_la_client_logo_upload' ) );
        add_action( 'wp_ajax_nopriv_emo_la_client_logo_upload', array( $this, 'emo_la_client_logo_upload' ) );
    }

    private function field_setter()
    {
        global $fileChecker;
        $this->nonce = EMO_LA_Request_Handler::get_post( 'nonce' );
        $this->file = EMO_LA_Request_Handler::get_FILE('logoImage');
        $this->fileChecker = $fileChecker;
    }

    private function nonce_checker()
    {
        if ( !wp_verify_nonce( $this->nonce, "emo_la_nonce".$this->postID)) {
            echo "<div class='emo-notice danger'>The page has expired</div>";
            wp_die();
        }
    }

    private function file_info(array $info)
	{
        $this->uploadPath = $info['fileDir'].'/'.date("Y").'/'.date("m").'/';
        $this->uploadUri = $info['fileUrl'].date("Y").'/'.date("m").'/';
 
        $this->imgName = time().'_'. basename($this->file['name']);
        $this->imgPath = $this->uploadPath.$this->imgName;
        $this->imgUrl = $this->uploadUri.$this->imgName;
        $this->imgExtension =strtolower(pathinfo($this->imgPath,PATHINFO_EXTENSION));
	}

    private function notice_handel($error = false, $msg)
    {
        if(!$error){
            return "<div class='emo-notice success'>".$msg."</div>";
        }else{
            return "<div class='emo-notice danger'>".$msg."</div>";
        }
    }

    private function upload_handler(array $fileChecker, string $filePath, array $file)
    {
        $extensions= ($fileChecker['extensions'])? $fileChecker['extensions']:array("png",'jpg', 'jpeg');
        $maxFileSize = ($fileChecker['max-size'])? $fileChecker['max-size']:2097152;

        //Check and create essential directories
        if (!file_exists($this->uploadPath)){
            mkdir($this->uploadPath, 0777, true);
        }

        //Upload and handle National ID Image
        $fileTemp =$file['tmp_name'];
        $fileSize = $file['size'];
        $fileExt =strtolower(pathinfo($filePath,PATHINFO_EXTENSION));

        if(in_array($fileExt,$extensions)=== false){
            $errorMsg= __( "The extension of uploaded file is not allowed, please choose a csv file.", "emo_logo_adder" );
            return ['error'=>$this->notice_handel(true, $errorMsg)];
        }
        if($fileSize > $maxFileSize){
            $errors= __( "File size is more than allowed size.", "emo_logo_adder" );
            return ['error'=>$this->notice_handel(true, $errorMsg)];
        }
        if(move_uploaded_file($fileTemp,$filePath)){
            return ['error'=>false];
        }
        return ['error'=>$this->notice_handel(true,  __( "It is not possible to upload the file at this time.", "emo_logo_adder" ))];
    }

    public function emo_la_client_logo_upload()
    {
        global $fileInfo;
        $this->field_setter();
        $this->nonce_checker();
        $this->file_info($fileInfo);

        $uploadedImg = $this->upload_handler($this->fileChecker, $this->imgPath, $this->file );

        //Remove image background
        global $gdLib;
        if(!$uploadedImg['error'] && $gdLib){
            // Path to the input image
            $inputImage = $this->imgPath;
            $outputImage = $this->uploadPath.'NOBG.png';
            $img = imagecreatefromjpeg($inputImage);; //or whatever loading function you need
            $white = imagecolorallocate($img, 255, 255, 255);
            imagecolortransparent($img, $white);
            imagepng($img, $outputImage);
            // // Free up memory
            // imagedestroy($sourceImage);
            // imagedestroy($targetImage);
        }
        if($uploadedImg['error']){
            $output = array(
                'error' => $uploadedImg['error']
            );
        }else{
            $output = array(
                'error' => false,
                'success' => $this->notice_handel(false,  __( "Congratulations, Your image uploded successfully.", "emo_logo_adder" )),
                'logSrc' => $this->imgUrl
            );
        }
        
        // echo json_encode($output);
        echo "Done";
        wp_die();
    }
}