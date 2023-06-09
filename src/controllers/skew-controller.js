export {skewYController, skewXController}
function skewYController(options, activeObject){
    if(options.target && options.transform.corner == 'mr'){
        activeObject.lockMovementX = true; 
        activeObject.lockMovementY = true;
        let controller = true        
        const startPoint = {X:options.e.layerX, Y:options.e.layerY }
        activeObject.canvas.on('mouse:move', function(options1) {
            if(options1.target && options1.target.__corner == 'mr' && controller){
                activeObject.lockMovementX = false; 
                activeObject.lockMovementY = false;
                // const deltaX = startPoint.X - options1.pointer.x;
                const deltaY = startPoint.Y - options1.pointer.y;
                // activeObject.skewX =activeObject.skewX+ deltaX;
                activeObject.skewY =activeObject.skewY+ deltaY;
            }
        })
        activeObject.canvas.on('mouse:up', (options3)=>{
            if(options3.target && options3.transform.corner == 'mr'&& controller){
                controller = false;
            }
        }) 
    }
}

function skewXController(options, activeObject){
    if(options.target && options.transform.corner == 'mb'){
        activeObject.lockMovementX = true; 
        activeObject.lockMovementY = true;
        let controller = true        
        const startPoint = {X:options.e.layerX, Y:options.e.layerY }
        activeObject.canvas.on('mouse:move', function(options1) {
            if(options1.target && options1.target.__corner == 'mb' && controller){
                activeObject.lockMovementX = false; 
                activeObject.lockMovementY = false;
                const deltaX = startPoint.X - options1.pointer.x;
                // const deltaY = startPoint.Y - options1.pointer.y;
                activeObject.skewX =activeObject.skewX+ deltaX;
                // activeObject.skewY =activeObject.skewY+ deltaY;
            }
        })
        activeObject.canvas.on('mouse:up', (options3)=>{
            if(options3.target && options3.transform.corner == 'mr'&& controller){
                controller = false;
            }
        }) 
    }
}