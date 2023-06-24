export{clientFabric}

import { fabric } from "fabric";
import 'fabric-customise-controls';
import { customiseControls, customiseCornerIcons } from "../controllers/icon-controls";

function clientFabric(logoSrc){
    //Add canvas to single product page
    let wooImgWrapper = document.getElementsByClassName('woocommerce-product-gallery__wrapper');
    let canvasDom = document.createElement('canvas');
    canvasDom.setAttribute('id', 'canvas');
    canvasDom.width = uploadedLogoData.canvasData.width;
    canvasDom.height = uploadedLogoData.canvasData.height;

    // var saveBtn = document.createElement('div');
    // saveBtn.classList.add('emo-btn', 'primary', 'client-save');
    // saveBtn.textContent = "Save";

    // var loadingImg = document.createElement('img');
    // loadingImg.src = uploadedLogoData.loadingSrc;
    // loadingImg.classList.add('loading-image');

    for(let item of wooImgWrapper){
        
        let wooPhotoTrigger = document.getElementsByClassName('woocommerce-product-gallery__trigger')
        for(let trigger of wooPhotoTrigger){
            trigger.style.display = 'none';
        }
        item.firstElementChild.innerHTML = '';
        item.firstElementChild.append(canvasDom);
    }

    saveBtn.style.display = "block";

    // let emoEditorIcon = document.getElementsByClassName('emo-editor-icon');
    // for( let elem of emoEditorIcon){
    //     elem.append(saveBtn);
    //     // elem.append(loadingImg);
    // }


    fabric.Canvas.prototype.customiseControls(customiseControls, ()=> canvas.renderAll())
    // Create a Fabric.js canvas instance
    const canvas = new fabric.Canvas('canvas');

    // All canvas data store in this variable
    var saveData;
    var logoData = JSON.parse(uploadedLogoData.logoData)
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

        // The data that must be sent to the server
        // 1- New canvas image
        // 2- The save data
        // 3- post id


        var data = new FormData();
        console.log(saveData);
        if(saveData == 'undefined' || !saveData){
            let jsonSaveData = logoData;
            
        }else{
            let jsonSaveData = JSON.parse(JSON.stringify(saveData));
        }
        
        jsonSaveData.backgroundImg = canvasData.background;
        // data.append('action', 'emo_la_client_save');
        // data.append('nonce', uploadedLogoData.nonce);
        // data.append('logoImage', file);
        // data.append('PostID', uploadedLogoData.postID);
        // data.append('logoData', JSON.stringify(jsonSaveData));

        /**
         * Send data to local storage
         */

        let storageData = localStorage.getItem("emoEditorData");
        if(!storageData){
            storageData = {
                [uploadedLogoData.postID]: {
                    logoData: jsonSaveData,
                    newImage: resultImage,
                    PostID: uploadedLogoData.postID
                }
            }
        }else{
            localStorage.removeItem("emoEditorData");
            storageData = JSON.parse(localStorage);
            storageData[uploadedLogoData.postID] = {
                logoData: jsonSaveData,
                newImage: resultImage,
                PostID: uploadedLogoData.postID
            }
        }
        localStorage.setItem('emoEditorData',  JSON.stringify(storageData))
        console.log('Save Data: ',jsonSaveData);
        console.log('Image: ',resultImage);
        // console.log('Local Storage: ', localStorage.getItem("emoEditorData") );
        // loadingImg.style.display = 'block';
        // fetch( wp_pageviews_ajax.ajax_url,{
        // method: "POST",
        // credentials: 'same-origin',
        // body: data
        // })
        // .then((response) => response.text())
        // .then((data) => {
        // if (data) {
        //     loadingImg.style.display = 'none';
        //     noticeContainer.innerHTML = data; 
        // }
        // })
        // .catch((error) => {
        // alert(error);
        // console.error(error);
        // });
    }

}