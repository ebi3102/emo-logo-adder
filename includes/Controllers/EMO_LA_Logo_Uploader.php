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
    private $imgPureName;

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
            echo json_encode([
                'error'=>$this->notice_handel(
                    true, 
                    "The page has been expired"
                )
            ]);
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
        $this->imgPureName = pathinfo($this->imgPath, PATHINFO_FILENAME);
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

        //Upload and handle Image
        $fileTemp =$file['tmp_name'];
        $fileSize = $file['size'];

        if(in_array($this->imgExtension,$extensions)=== false){
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

    private function remove_background(array $uploadedImg)
    {
        global $gdLib;
        if(!$uploadedImg['error'] && $gdLib){
            $inputImage = $this->imgPath;
            if($this->imgExtension == 'jpg'|| $this->imgExtension == 'jpeg'){
                $img = imagecreatefromjpeg($inputImage);
            }elseif($this->imgExtension == 'png'){
                $img = imagecreatefrompng($inputImage);
            }else{
                return false;
            }

            $outputImagePath = $this->uploadPath.$this->imgPureName.'_NOBG_.png';
            $outputImageUrl = $this->uploadUri.$this->imgPureName.'_NOBG_.png';
            $white = imagecolorallocate($img, 255, 255, 255);
            imagecolortransparent($img, $white);
            $returnImg = imagepng($img, $outputImagePath);
            // Free up memory
            imagedestroy($img);
            if($returnImg){
                return $outputImageUrl;
            }else{
                return false;
            }   
        }else{
            return false;
        }
        
    }

    public function emo_la_client_logo_upload()
    {
        global $fileInfo;
        $this->field_setter();
        $this->nonce_checker();
        $this->file_info($fileInfo);

        $uploadedImg = $this->upload_handler($this->fileChecker, $this->imgPath, $this->file );
        $logoData = get_post_meta( $this->postID, EMO_LA_LOGO_DATA, true );

        if($uploadedImg['error']){
            $output = array(
                'error' => $uploadedImg['error']
            );
        }else{
            $output = array(
                'error' => false,
                'success' => $this->notice_handel(false,  __( "Congratulations, Your image uploded successfully.", "emo_logo_adder" )),
                'logSrc' => $this->imgUrl,
                'logoNOBGSrc' =>  $this->remove_background($uploadedImg),
                'logoData' =>$this->logoData
            );
        }
        
        echo json_encode($output);
        wp_die();
    }
}