export{clientFabric}

import { fabric } from "fabric";
import 'fabric-customise-controls';
import { customiseControls, customiseCornerIcons } from "../controllers/icon-controls";
import { save_to_local } from "../controllers/client-save-localStorage";
import { hook_printed_products } from "../templates/printed_products";

function clientFabric(logoSrc , activeImageID){
    //Add canvas to single product page
    let canvasDom = document.createElement('canvas');
    canvasDom.setAttribute('id', `canvas-${activeImageID}`);
    canvasDom.width = canvasData.canvasData.width;
    canvasDom.height = canvasData.canvasData.height;

    let figure = document.querySelector('figure.woocommerce-product-gallery__wrapper');
    if(figure.querySelector('div.flex-active-slide')){
        figure.querySelector('div.flex-active-slide').innerHTML = '';
        figure.querySelector('div.flex-active-slide').append(canvasDom);
    }else{
        figure.querySelector('div').innerHTML = '';
        figure.querySelector('div').append(canvasDom);
    }

    saveBtn.style.display = "block";

    fabric.Canvas.prototype.customiseControls(customiseControls, ()=> canvas.renderAll())
    // Create a Fabric.js canvas instance
    const canvas = new fabric.Canvas(`canvas-${activeImageID}`);

    // All canvas data store in this variable
    var saveData;
    var logoData = canvasData.logoData[activeImageID];
    const image1Url = logoData.backgroundImg;
    const image2Url = logoSrc;
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
    
    canvas.on("object:modified", (event)=>{
      saveData = event.target;
    });
    
    saveBtn.addEventListener('click', ()=>{
        /**
         * TODO: Add two new variation to the single product
         * TODO: Hook the new variations and local storage data to the order and cart
         */
        save_to_local(canvas, saveData, logoData, activeImageID );

        /**
         * Add two new variation to the single product
         */
        let cartForm = document.querySelector('form.cart');
        if(!cartForm.querySelector("#printProductSelect")){
            cartForm.prepend( hook_printed_products());
        }
    });
}