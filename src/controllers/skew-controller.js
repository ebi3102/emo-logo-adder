
function skewController(options, activeObject){
    // console.log(options.e.clientX, options.e.clientY);
    const startPoint = {X:options.e.layerX, Y:options.e.layerY }
    activeObject.canvas.on('mouse:up', function(options1) {
        const lastPoint = {X:options1.e.layerX, Y:options1.e.layerY }
        const deltaX = startPoint.X - lastPoint.X;
        const deltaY = startPoint.Y - lastPoint.Y;
        // const skewX = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        // const skewY = Math.atan2(deltaX, deltaY) * (180 / Math.PI);
        const skewX = deltaX;
        const skewY = deltaY;
        console.log(deltaX,deltaY);
        console.log(activeObject.skewX, activeObject.skewY);
        // activeObject.skewX = skewX;
        // activeObject.skewY = skewY;
    }) 
}

export default skewController;