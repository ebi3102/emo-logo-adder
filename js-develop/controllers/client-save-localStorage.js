export {save_to_local}
function save_to_local(saveData, logoData ){
    const image = canvas.toDataURL({
        format: 'png',
        quality: 1
    });
    const resultImage = new Image();
    resultImage.src = image;

    var data = new FormData();
    
    if(saveData == 'undefined' || !saveData){
        var jsonSaveData = logoData;
    }else{
        var jsonSaveData = JSON.parse(JSON.stringify(saveData));
    }
    console.log(jsonSaveData);
    jsonSaveData.backgroundImg = canvasData.background;

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
    localStorage.setItem('emoEditorData',  JSON.stringify(storageData));
}