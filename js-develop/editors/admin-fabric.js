export {adminFabric}

import { fabric } from "fabric";
import 'fabric-customise-controls';
import { customiseControls, customiseCornerIcons } from "../controllers/icon-controls";
import {saveCanvasData} from "../controllers/admin-save-data";

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

    const admin_upload_logo = (e)=>{
      e.preventDefault();
      var mediaLibrary = wp.media({
          title: 'Select an Image',
          multiple: false
      });

      mediaLibrary.on('select', function() {
        var selectedImage = mediaLibrary.state().get('selection').first();
        var imageUrl = selectedImage.toJSON().url;
        fabric.Image.fromURL(imageUrl, function(img3) {
            img3.name = "logo";
            img3.set(JSON.parse(canvasData.logoData));
            canvas.add(img3);

            var object = canvas.getActiveObject();
            canvas.remove(object);

            canvas.setActiveObject(img3);
          });
      });

      mediaLibrary.open();
    }

    emoUploadlogo.onclick = admin_upload_logo;


    canvas.on('selection:created', function(event) {
        const activeObject = event.target;
        activeObject.hasBorders = true;
        activeObject.hasControls = true;
        activeObject.customiseCornerIcons( customiseCornerIcons,()=>canvas.renderAll());
    });

    canvas.on("object:modified", (event)=>{
        saveData = event.target;
    });

    document.getElementById('emoSaveEditor').addEventListener('click', ()=>{
        if(saveData == 'undefined' || !saveData){
            var jsonSaveData = canvasData.logoData;
        }else{
            var jsonSaveData = JSON.parse(JSON.stringify(saveData));
        }
        jsonSaveData.backgroundImg = canvasData.background;
        jsonSaveData = {[imgId]:jsonSaveData};
        saveCanvasData(jsonSaveData);
    });



}