export{clientFabric}

import { fabric } from "fabric";
// import 'fabric-customise-controls';
// import { customiseControls, customiseCornerIcons } from "../controllers/icon-controls";

function clientFabric(logoSrc){
    let wooImgWrapper = document.getElementsByClassName('woocommerce-product-gallery__wrapper');
    let canvasDom = document.createElement('canvas');
    canvasDom.setAttribute('id', 'canvas');
    canvasDom.width = uploadedLogoData.canvasData.width;
    canvasDom.height = uploadedLogoData.canvasData.height;
    for(let item of wooImgWrapper){
        console.log(item);
        item.innerHTML = '';
        item.append(canvasDom);
    }
    // fabric.Canvas.prototype.customiseControls(customiseControls, ()=> canvas.renderAll())

    // Create a Fabric.js canvas instance
    const canvas = new fabric.Canvas('canvas');

    // All canvas data store in this variable
    var saveData;
    const image1Url = "http://localhost/wp-test/wp-content/uploads/2023/06/vneck-tee.jpg";
    const image2Url = logoSrc;
    fabric.Image.fromURL(image1Url, function(img1) {
        // add background image
        canvas.setBackgroundImage(img1, canvas.renderAll.bind(canvas), {
           scaleX: canvas.width / img1.width,
           scaleY: canvas.height / img1.height,
        });
    });

}