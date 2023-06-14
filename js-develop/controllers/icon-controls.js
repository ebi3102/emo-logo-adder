import {skewYController, skewXController} from "./skew-controller";

export {customiseControls, customiseCornerIcons}

const imgCursor = encodeURIComponent(`
  <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24'>
    <defs>
      <filter id='a' width='266.7%' height='156.2%' x='-75%' y='-21.9%' filterUnits='objectBoundingBox'>
        <feOffset dy='1' in='SourceAlpha' result='shadowOffsetOuter1'/>
        <feGaussianBlur in='shadowOffsetOuter1' result='shadowBlurOuter1' stdDeviation='1'/>
        <feColorMatrix in='shadowBlurOuter1' result='shadowMatrixOuter1' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0'/>
        <feMerge>
          <feMergeNode in='shadowMatrixOuter1'/>
          <feMergeNode in='SourceGraphic'/>
        </feMerge>
      </filter>
      <path id='b' d='M1.67 12.67a7.7 7.7 0 0 0 0-9.34L0 5V0h5L3.24 1.76a9.9 9.9 0 0 1 0 12.48L5 16H0v-5l1.67 1.67z'/>
    </defs>
    <g fill='none' fill-rule='evenodd'><path d='M0 24V0h24v24z'/>
      <g fill-rule='nonzero' filter='url(#a)' transform='rotate(-90 9.25 5.25)'>
        <use fill='#000' fill-rule='evenodd' xlink:href='#b'/>
        <path stroke='#FFF' d='M1.6 11.9a7.21 7.21 0 0 0 0-7.8L-.5 6.2V-.5h6.7L3.9 1.8a10.4 10.4 0 0 1 0 12.4l2.3 2.3H-.5V9.8l2.1 2.1z'/>
      </g>
    </g>
  </svg>`);

const customiseControls = {
    tl: {
        action: 'scale',
        cursor: 'nw-resize'
    },
    tr: {
        action: 'scale',
        cursor: 'ne-resize'
    },
    bl: {
        action: 'scale',
        cursor: 'ne-resize'
    },
    br: {
        action: 'scale',
        cursor: 'nw-resize'
    },
    mb: {
        action: function( event, target ) {
            target.canvas.on('mouse:down', (options)=> skewXController(options, target, 'mb'))
        },
        cursor: 'e-resize'
    },
    mt: {
        action: function( event, target ) {
            target.canvas.on('mouse:down', (options)=> skewXController(options, target, 'mt'))
        },
        cursor: 'e-resize'
    },
    mr: {
        action: function( event, target ) {
            target.canvas.on('mouse:down', (options)=> skewYController(options, target, 'mr'))
        },
        cursor: 'n-resize'
    },
    ml:{
        action: function( event, target ) {
            target.canvas.on('mouse:down', (options)=> skewYController(options, target, 'ml'))
        },
        cursor: 'n-resize'
    },
    // only is hasRotatingPoint is not set to false
    mtr: {
        action: 'rotate',
        cursor: `url("data:image/svg+xml;charset=utf-8,${imgCursor}") 12 12, crosshair`
    },
};

const customiseCornerIcons ={
    settings: {
        borderColor: 'white',
        cornerSize: 18,
        cornerShape: 'circle',
        cornerBackgroundColor: 'white',
        cornerPadding: 4,
    },
    tl: {
        icon: canvasData.tl,
    },
    tr: {
        icon: canvasData.tr,
    },
    bl: {
        icon: canvasData.bl,
    },
    br: {
        icon: canvasData.br,
    },
    mb: {
        icon: canvasData.mb,
    },
    mt: {
        icon: canvasData.mt,
    },
    mr: {
        icon: canvasData.mr,
    },
    ml: {
        icon: canvasData.ml,
    },
    mtr: {
        icon: canvasData.mtr,
    },
}
