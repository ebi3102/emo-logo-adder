import { fabric } from "fabric";
import 'fabric-customise-controls';
import { customiseControls, customiseCornerIcons } from "./controllers/icon-controls";

fabric.Canvas.prototype.customiseControls(customiseControls, ()=> canvas.renderAll())

// Create a Fabric.js canvas instance
const canvas = new fabric.Canvas('canvas');

// All canvas data store in this variable
var saveData;

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

console.log(JSON.parse(canvasData.logoData));
fabric.Image.fromURL(image2Url, function(img2) {
  img2.name = "logo";
  img2.set(JSON.parse(canvasData.logoData));
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
  saveData = event.target
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
  
  const resultImage = new Image();
  resultImage.src = image;
  var data = new FormData();
  data.append('action', 'emo_la_admin_save');
  data.append('postID', emoSaveEditor.getAttribute('data_id'));
  data.append('nonce', emoSaveEditor.getAttribute('data-nonce'));
  data.append('logoData', JSON.stringify(saveData));
 
  fetch( wp_pageviews_ajax.ajax_url,{
    method: "POST",
    credentials: 'same-origin',
    body: data
  })
  .then((response) => response.text())
  .then((data) => {
    if (data) {
      console.log('The server responded: ' + data);
      noticeContainer.innerHTML = data; 
    }
  })
  .catch((error) => {
    alert(error);
    console.error(error);
  });
  // document.body.appendChild(resultImage);
}

