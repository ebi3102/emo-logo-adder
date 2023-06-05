import { fabric } from "fabric";
import { pointer } from "./editor-objects";


// Create a Fabric.js canvas instance
const canvas = new fabric.Canvas('canvas');

console.log(canvas.getPointer())

// Load the images
const image1Url = './images/img.webp';
const image2Url = './images/logo-2.png';

fabric.Image.fromURL(image1Url, function(img1) {
  // add background image
  canvas.setBackgroundImage(img1, canvas.renderAll.bind(canvas), {
     scaleX: canvas.width / img1.width,
     scaleY: canvas.height / img1.height,
  });
});

let logoImg = fabric.Image.fromURL(image2Url, function(img2) {
  img2.name = "logo";
  img2.set({ 
    left: 80, 
    top: 80,
  });
  img2.scaleX = 0.4; 
  img2.scaleY = 0.4;
  img2.hasControls = true;
  // img2.hasborder = false;
  img2.skewX = 12;
  img2.skewY = 23;

  // Create a selectable object (e.g., rectangle) around the image
  // const selectableObject = new fabric.Rect({
  //   name: "SkewController",
  //   left: img2.left + (img2.width/4),
  //   top: img2.top - 10,
  //   width: 10,
  //   height: 10,
  //   fill: 'blue',
  //   stroke: 'blue',
  //   strokeWidth: 2,
  //   hasControls: false,
  //   hasBorders: false,
  //   selectable: true
  // });

  // Group the image and the selectable object together
  // const group = new fabric.Group([img2, selectableObject], {
  //   selectable: true,
  //   hasControls: false,
  //   hasBorders: false
  // });
  
  canvas.add(img2);
  
});


// let PTL = pointer(200,200, null,null,null ) // biuld ediot pointer Top Left corner
// PTL.name = "ptl"
// canvas.add(PTL)


// canvas.on('object:moving', function(event) {
//   console.log(canvas.getPointer(event.target));
// });
//   const activeObject = e.target;
//   const skewX = activeObject.left - activeObject.leftOriginal;
//   const skewY = activeObject.top - activeObject.topOriginal;
//   console.log(activeObject.left)
//   console.log(activeObject.leftOriginal)

//   // console.log("SkewX: "+ skewX)
//   // console.log("SkewY: "+ skewY)
  
//   // Apply skew transformation to the image
//   // const image = activeObject.getObjects()[0]; // Assuming the image is the first object in the group
//   // // console.log(image.name)
//   // if (image) {
//   //   image.skewX = skewX;
//   //   image.skewY = skewY;
//   //   canvas.requestRenderAll();
//   // }
// });

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

