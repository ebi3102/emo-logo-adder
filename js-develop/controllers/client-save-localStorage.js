export {save_to_local}
function save_to_local(saveData, logoData ){
    const image = canvas.toDataURL({
        format: 'png',
        quality: 1
    });
    const resultImage = new Image();
    resultImage.src = image;

    /**
     * TODO: Add two new variation to the single product
     * TODO: Hook the new variations and local storage data to the order and cart
     */


    var data = new FormData();
    
    if(saveData == 'undefined' || !saveData){
        var jsonSaveData = logoData;
    }else{
        var jsonSaveData = JSON.parse(JSON.stringify(saveData));
    }
    console.log(jsonSaveData);
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
                newImage: image,
                PostID: uploadedLogoData.postID
            }
        }
    }else{
        storageData = JSON.parse(storageData);
        storageData[uploadedLogoData.postID] = {
            logoData: jsonSaveData,
            newImage: resultImage,
            PostID: uploadedLogoData.postID
        }
        localStorage.removeItem("emoEditorData");
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