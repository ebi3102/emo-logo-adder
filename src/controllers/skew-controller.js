export {skewYController, skewXController}
function skewYController(options, activeObject, cornerName){
    if(options.target && options.transform.corner == cornerName){
        activeObject.lockMovementX = true; 
        activeObject.lockMovementY = true;
        let controller = true;
        let startPoint = {X:options.e.layerX, Y:options.e.layerY }
        activeObject.canvas.on('mouse:move', function(options1) {
            if(options1.target && options1.target.__corner == cornerName && controller){
                activeObject.lockMovementX = false; 
                activeObject.lockMovementY = false;
                const deltaY = startPoint.Y - options1.pointer.y;
                startPoint = {X:options1.pointer.x, Y:options1.pointer.y}
                if(cornerName == 'mr'){
                    activeObject.skewY =activeObject.skewY - deltaY;
                }else if(cornerName == 'ml'){
                    activeObject.skewY =activeObject.skewY + deltaY;
                }
                
            }
        })
        activeObject.canvas.on('mouse:up', (options3)=>{
            if(options3.target && options3.transform.corner == 'mr'&& controller){
                controller = false;
            }
        }) 
    }
}

function skewXController(options, activeObject, cornerName){
    if(options.target && options.transform.corner == cornerName){
        activeObject.lockMovementX = true; 
        activeObject.lockMovementY = true;
        let controller = true        
        let startPoint = {X:options.e.layerX, Y:options.e.layerY }
        activeObject.canvas.on('mouse:move', function(options1) {
            if(options1.target && options1.target.__corner == cornerName && controller){
                activeObject.lockMovementX = false; 
                activeObject.lockMovementY = false;
                const deltaX = startPoint.X - options1.pointer.x;
                startPoint = {X:options1.pointer.x, Y:options1.pointer.y}
                activeObject.skewX =activeObject.skewX+ deltaX;
            }
        })
        activeObject.canvas.on('mouse:up', (options3)=>{
            if(options3.target && options3.transform.corner == 'mr'&& controller){
                controller = false;
            }
        }) 
    }
}