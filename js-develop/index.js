import { fabric } from "fabric";
import 'fabric-customise-controls';
import { customiseControls, customiseCornerIcons } from "./controllers/icon-controls";

fabric.Canvas.prototype.customiseControls(customiseControls, ()=> canvas.renderAll())

// Create a Fabric.js canvas instance
const canvas = new fabric.Canvas('canvas');

var saveData = {};
// Load the images
const image1Url = canvasData.background;
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
  img2.set({ 
    left: 80, 
    top: 80,
  });
  img2.scaleX = 0.4; 
  img2.scaleY = 0.4;
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
    saveData.newLog = imageUrl;
    fabric.Image.fromURL(imageUrl, function(img3) {
        img3.name = "logo";
        img3.set({ 
          left: 80, 
          top: 80,
        });
        img3.scaleX = 0.4; 
        img3.scaleY = 0.4;
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

document.getElementById('emoSaveEditor').addEventListener('click', ()=>{
  saveCanvasAsImage()
});

// Save the canvas as an image
function saveCanvasAsImage() {
  const image = canvas.toDataURL({
    format: 'png',
    quality: 1
  });
  console.log('New Logo', saveData);
  console.log('Defualt Logo', canvasData.logo)
  console.log(canvas);
  console.log('ActiveObject: ',canvas.getActiveObject);
  console.log('_ActiveObject: ',canvas._activeObject);
  // You can now use 'image' to display or save the edited image
  // For example, to display the edited image in an <img> tag:
  const resultImage = new Image();
  resultImage.src = image;
  document.body.appendChild(resultImage);
}

