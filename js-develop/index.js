import { fabric } from "fabric";
import 'fabric-customise-controls';
import { customiseControls, customiseCornerIcons } from "./controllers/icon-controls";

fabric.Canvas.prototype.customiseControls(customiseControls, ()=> canvas.renderAll())

// Create a Fabric.js canvas instance
const canvas = new fabric.Canvas('canvas');

// Load the images
// const image1Url = '../images/img.png';
const image1Url = EMOfeatuerImage.src;
console.log(image1Url);
// const image2Url = '../images/logo-2.png';

fabric.Image.fromURL(image1Url, function(img1) {
  // add background image
  canvas.setBackgroundImage(img1, canvas.renderAll.bind(canvas), {
     scaleX: canvas.width / img1.width,
     scaleY: canvas.height / img1.height,
  });
});

// fabric.Image.fromURL(image2Url, function(img2) {
//   img2.name = "logo";
//   img2.set({ 
//     left: 80, 
//     top: 80,
//   });
//   img2.scaleX = 0.4; 
//   img2.scaleY = 0.4;
//   img2.hasControls = false;
//   img2.hasBorders = false;

//   // overwrite the prototype object based
  
  
//   canvas.add(img2);
//   canvas.setActiveObject(img2);
// });

canvas.on('selection:created', function(event) {
    const activeObject = event.target;
    activeObject.hasBorders = true;
    activeObject.hasControls = true;
    activeObject.customiseCornerIcons( customiseCornerIcons,()=>canvas.renderAll());
});



// document.getElementById('btnSave').querySelector('click', saveCanvasAsImage());
document.getElementById('btnSave').addEventListener('click', ()=>{
  saveCanvasAsImage()
});


// Resize the images
function resizeImages(scaleFactor=0.5) {
  // const scaleFactor = 0.5; // Example: Reduce image size by 50%
  canvas.forEachObject(function(obj) {
    obj.scale(scaleFactor);
    obj.setCoords();
  });
}

// Rotate the images
function rotateImages() {
  const rotationAngle = 45; // Example: Rotate images by 45 degrees
  canvas.forEachObject(function(obj) {
    obj.rotate(rotationAngle);
    obj.setCoords();
  });
}

// Merge the images
function mergeImages() {
  const mergedImage = new fabric.Image(canvas.toDataURL());
  canvas.clear().add(mergedImage);
}

// Save the canvas as an image
function saveCanvasAsImage() {
  const image = canvas.toDataURL({
    format: 'png',
    quality: 1
  });

  // You can now use 'image' to display or save the edited image
  // For example, to display the edited image in an <img> tag:
  const resultImage = new Image();
  resultImage.src = image;
  document.body.appendChild(resultImage);
}

