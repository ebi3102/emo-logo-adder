export {adminFabric}

import { fabric } from "fabric";
import 'fabric-customise-controls';
import { customiseControls, customiseCornerIcons } from "../controllers/icon-controls";

function adminFabric(backgroundUrl, imgId){
    let canvasDom = document.createElement('canvas');
    canvasDom.setAttribute('id', `canvas-${imgId}`);
    canvasDom.width = canvasData.canvasData.width;
    canvasDom.height = canvasData.canvasData.height;
    canvasContainer.append(canvasDom);

    fabric.Canvas.prototype.customiseControls(customiseControls, ()=> canvas.renderAll())
    // Create a Fabric.js canvas instance
    const canvas = new fabric.Canvas(`canvas-${imgId}`);

    // All canvas data store in this variable
    var saveData;
    var logoData = JSON.parse(canvasData.logoData)
    const image1Url = backgroundUrl;
    const image2Url = canvasData.logo;

    fabric.Image.fromURL(image1Url, function(img1) {
        // add background image
        canvas.setBackgroundImage(img1, canvas.renderAll.bind(canvas), {
           scaleX: canvas.width / img1.width,
           scaleY: canvas.height / img1.height,
        });
    });

    fabric.Image.fromURL(image2Url, function(img2) {
        img2.name = "logo";
        img2.set(logoData);
        img2.hasControls = false;
        img2.hasBorders = false;
        canvas.add(img2);
        canvas.setActiveObject(img2);
      });

    canvas.on('selection:created', function(event) {
        const activeObject = event.target;
        activeObject.hasBorders = true;
        activeObject.hasControls = true;
        activeObject.customiseCornerIcons( customiseCornerIcons,()=>canvas.renderAll());
    });


}