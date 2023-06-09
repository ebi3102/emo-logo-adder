import skewController from "./skew-controller";

export {customiseControls, customiseCornerIcons}

const customiseControls = {
    tl: {
        action: 'rotate',
        cursor: 'pointer'
    },
    tr: {
        action: 'scale',
        cursor: 'pointer'
    },
    bl: {
        action: 'remove',
        cursor: 'pointer'
    },
    br: {
        action: 'skew',
        cursor: 'pointer'
    },
    mb: {
        action: false,
        cursor: 'pointer'
    },
    mt: false,
    mr: {
        action: function( event, target ) {
            target.canvas.on('mouse:down', (options)=> skewController(options, target))
            console.log(target.canvas);
            console.log(event);
            // console.log(e.movementX());
            // target.set( {
            //     left: 200
            // } );
            // canvas.renderAll();
        },
        cursor: 'pointer'
    },
    ml:false,
    // only is hasRotatingPoint is not set to false
    mtr: {
        action: 'rotate',
        cursor: 'pointer'
    },
};

const customiseCornerIcons ={
    settings: {
        borderColor: 'black',
        cornerSize: 25,
        cornerShape: 'rect',
        cornerBackgroundColor: 'black',
        cornerPadding: 10,
    },
    tl: {
        icon: 'icons/rotate.svg',
    },
    tr: {
        icon: 'icons/resize.svg',
    },
    bl: {
        icon: 'icons/remove.svg',
    },
    br: {
        icon: 'icons/up.svg',
    },
    mb: {
        icon: 'icons/down.svg',
    },
    mt: {
        icon: 'icons/acute.svg',
    },
    mr: {
        icon: 'icons/repair-tools-cross.svg',
    },
    mtr: {
        icon: 'icons/rotate.svg',
    },
}
