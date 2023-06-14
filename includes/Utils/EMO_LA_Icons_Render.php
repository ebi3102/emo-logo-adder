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
        // tl: {
        //     icon: '../icons/rotate.svg',
        // },
        // tr: {
        //     icon: '../icons/resize.svg',
        // },
        // bl: {
        //     icon: '../icons/remove.svg',
        // },
        // br: {
        //     icon: '../icons/up.svg',
        // },
        // mb: {
        //     icon: '../icons/down.svg',
        // },
        // mt: {
        //     icon: '../icons/acute.svg',
        // },
        // mr: {
        //     icon: '../icons/repair-tools-cross.svg',
        // },
        // mtr: {
        //     icon: '../icons/rotate.svg',
        // },
        // tl:".EMO_LA_URI."assets/icons/',
        //     tr:".EMO_LA_URI."assets/icons/',
        //     bl:".EMO_LA_URI."assets/icons/',
        //     br:".EMO_LA_URI."assets/icons/',
        //     mb:".EMO_LA_URI."assets/icons/',
        //     mt:".EMO_LA_URI."assets/icons/',
        //     mr:".EMO_LA_URI."assets/icons/',
        //     mtr:".EMO_LA_URI."assets/icons/',
        return "
            tl:'".EMO_LA_URI."assets/icons/resize-inverse.svg',
            tr:'".EMO_LA_URI."assets/icons/resize.svg',
            bl:'".EMO_LA_URI."assets/icons/resize.svg',
            br:'".EMO_LA_URI."assets/icons/resize-inverse.svg',
            mb:'".EMO_LA_URI."assets/icons/left-right.svg',
            mt:'".EMO_LA_URI."assets/icons/left-right.svg',
            mr:'".EMO_LA_URI."assets/icons/up-down.svg',
            ml:'".EMO_LA_URI."assets/icons/up-down.svg',
            mtr:'".EMO_LA_URI."assets/icons/rotate.svg',
        ";

    }

    public function imageRender()
    {
        return "
            background: '".get_the_post_thumbnail_url($this->postObject)."',
            logo: '".EMO_LA_URI."assets/images/logo.png',
        ";
    }

    public function render()
    {
        $htmlTemplate = "<script>
        const canvasData = {";
        $htmlTemplate .= $this->iconRender();
        $htmlTemplate .= $this->imageRender();
        $htmlTemplate .= "}
        </script>";
        return $htmlTemplate;
    }
}