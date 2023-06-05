import { fabric } from "fabric";
// import perspectiveAction from "./perspective";
// import { pointer } from "./editor-objects";

function getQuadraticBezierXYatT(start_point, control_point, end_point, T) {

	var pow1minusTsquared = Math.pow(1 - T, 2),
		powTsquared = Math.pow(T, 2);

	var x = pow1minusT_squared * start_point.x + 2 * (1 - T) * T * control_point.x + powTsquared * end_point.x,
		y = pow1minusT_squared * start_point.y + 2 * (1 - T) * T * control_point.y + powTsquared * end_point.y; 
	
	return {
		x: x,
		y: y
	};
}

// console.log(perspectiveAction)
const canvas2 = document.getElementById("canvas2");
const ctx = canvas2.getContext("2d");
const image = document.getElementById("logoImg");
var offset_x_points = [],
	t = 0;
for ( ; t < image.height; t++ ) {
	var xyAtT = getQuadraticBezierXYatT(start_point, control_point, end_point, t / image_height),
		x = parseInt(xyAtT.x);

	offset_x_points.push(x);
}

var x = 0;
for ( ; x < image.width; x++ ) {
  ctx.drawImage(image,
        // clip 1 pixel wide slice from the image
        x, 0, 1, image.height + warp_y_offset,
        // draw that slice with a y-offset
        x, warp_y_offset + offset_y_points[x], 1, image_height + warp_y_offset
	);
}

  // for(var x=0;x<offsetY.length;x++){
  //   ctx.drawImage(image,
  //       // clip 1 pixel wide slice from the image
  //       x,0,1,image.height,
  //       // draw that slice with a y-offset
  //       x,offsetY[x],1,image.height
  //   );           
  // }
// ctx.drawImage(image, 100, 100, 150, 40);

// image.addEventListener("load", (e) => {

// });

// Create a Fabric.js canvas instance
const canvas = new fabric.Canvas('canvas');

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
    // clipTo: function(ctx){
    //   ctx.rect(dwidth / 2 - sx, dheight / 2 - sy, swidth, sheight);
    // }
  });
  img2.scaleX = 0.4; 
  img2.scaleY = 0.4;
  img2.hasControls = true;
  // img2.hasborder = false;
  img2.skewX = 12;
  img2.skewY = 23;
  

  // let offsetY=[0,1,2,3,4,5,6,5,4,3,2,1,0];

  // for(var x=0;x<offsetY.length;x++){
  //   context.drawImage(img3,
  //       // clip 1 pixel wide slice from the image
  //       x,0,1,img3.height,
  //       // draw that slice with a y-offset
  //       x,offsetY[x],1,img3.height
  //   );           
  // }
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

