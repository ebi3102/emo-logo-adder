// export {add_skew_controller};

// function add_skew_controller(){

//     fabric.Object.prototype.controls = fabric.Object.prototype.controls || {};

//     fabric.Object.prototype.controls.customSkewControl = new fabric.Control({
//     x: 0.5,
//     y: -0.5,
//     offsetY: -40,
//     cursorStyle: 'crosshair',
//     actionHandler: function(control, fabricObject, event) {
//         const canvas = fabricObject.canvas;
//         const pointer = canvas.getPointer(event.e);
//         const lastPoint = fabricObject.corners[control.corner];
//         const deltaX = pointer.x - lastPoint.x;
//         const deltaY = pointer.y - lastPoint.y;
//         const skewX = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
//         const skewY = Math.atan2(deltaX, deltaY) * (180 / Math.PI);

//         // Apply skew transformation to the object
//         fabricObject.skewX = skewX;
//         fabricObject.skewY = skewY;

//         // Redraw the canvas
//         canvas.renderAll();
//     },
//     mouseUpHandler: function(control, fabricObject, event) {
//         // No action needed after releasing the mouse button
//     },
//     render: function(ctx, left, top, styleOverride, fabricObject) {
//         // Draw the skew control icon (e.g., a plus sign)
//         const size = this.sizeX || this.sizeY || 10;
//         ctx.beginPath();
//         ctx.moveTo(left, top - size);
//         ctx.lineTo(left, top + size);
//         ctx.moveTo(left - size, top);
//         ctx.lineTo(left + size, top);
//         ctx.stroke();
//     },
//     corner: 'tr',
//     actionName: 'skew'
//     });

//     fabric.Object.prototype.setControlsVisibility({
//     tl: false,
//     tr: true,
//     br: false,
//     bl: false,
//     ml: false,
//     mt: false,
//     mr: false,
//     mb: false,
//     mtr: false,
//     customSkewControl: true
//     });


// }
