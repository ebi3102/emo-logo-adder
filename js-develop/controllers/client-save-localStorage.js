export {save_to_local, save_item_local}
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

/**
 * This function add just one item to local storage
 * It is useful for adding printed product or any other things to local storage
 * @param {*} storageName 
 * @param {*} postID 
 * @param {*} key 
 * @param {*} value 
 */
function save_item_local(storageName, postID, key, value){

    let storageData = localStorage.getItem(storageName);
    if(!storageData){
        storageData = {
            [postID]: {key: value}
        };
    }else{
        storageData = JSON.parse(storageData);
        if(!storageData[postID]){
            storageData[postID] = {key:value} ;
        }else{
            storageData[postID][key] = value;
        }
        localStorage.removeItem(storageName);
    }
    localStorage.setItem(storageName, JSON.stringify(storageData));

}