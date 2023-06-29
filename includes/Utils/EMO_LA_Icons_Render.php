<?php

namespace EMO_LA\Utils;

class EMO_LA_Icons_Render
{
    private $postObject;
    private $scriptName;

    public function __construct($postObject, $scriptName)
    {
        $this->postObject = $postObject;
        $this->scriptName = $scriptName;
    }
    public function iconRender()
    {
        return array(
            'tl'=> EMO_LA_URI."assets/icons/resize-inverse.svg",
            'tr'=>EMO_LA_URI."assets/icons/resize.svg",
            'bl'=>EMO_LA_URI."assets/icons/resize.svg",
            'br'=>EMO_LA_URI."assets/icons/resize-inverse.svg",
            'mb'=>EMO_LA_URI."assets/icons/left-right.svg",
            'mt'=>EMO_LA_URI."assets/icons/left-right.svg",
            'mr'=>EMO_LA_URI."assets/icons/up-down.svg",
            'ml'=>EMO_LA_URI."assets/icons/up-down.svg",
            'mtr'=>EMO_LA_URI."assets/icons/rotate.svg",
        );
    }

    public function imageRender()
    {
        $logoData = get_post_meta( $this->postObject->ID, EMO_LA_LOGO_DATA, true );
        global $defualtLogoData;   
        global $canvasData; 
        return array(
            // "background" => get_the_post_thumbnail_url($this->postObject),
            // "logo" =>(!$logoData || $logoData == 'undefined')? EMO_LA_URI."assets/images/logo.png" : json_decode($logoData)->src,
            "logo" => EMO_LA_URI."assets/images/logo.png",
            // "logoData" => (!$logoData || $logoData == 'undefined')? json_encode($defualtLogoData) : $logoData,
            "logoData" => json_encode($defualtLogoData),
            "canvasData" =>$canvasData
        );
    }

    public function render()
    {
        $canvasData = array_merge($this->iconRender(), $this->imageRender());
        wp_localize_script( $this->scriptName, 'canvasData', $canvasData);
    }
}