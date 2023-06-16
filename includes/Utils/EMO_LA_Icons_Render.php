<?php

namespace EMO_LA\Utils;

class EMO_LA_Icons_Render
{
    private $postObject;

    public function __construct($postObject)
    {
        $this->postObject = $postObject;
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
        
        return array(
            "background" => get_the_post_thumbnail_url($this->postObject),
            "logo" =>($logoData)? json_decode($logoData)->src : EMO_LA_URI."assets/images/logo.png",
            "logoData" => ($logoData)? $logoData:"false"
        );
    }

    public function render()
    {
        $canvasData = array_merge($this->iconRender(), $this->imageRender());
        wp_localize_script( 'emo-image-editor', 'canvasData', $canvasData);
    }
}