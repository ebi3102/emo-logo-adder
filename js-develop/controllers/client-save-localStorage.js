export {save_to_local, save_item_local}
function save_to_local(canvas, saveData, logoData, activeImageID ){
    const image = canvas.toDataURL({
        format: 'png',
        quality: 1
    });
    const resultImage = new Image();
    resultImage.src = image;

    var data = new FormData();

    if(saveData == 'undefined' || !saveData){
        var jsonSaveData = JSON.parse(JSON.stringify(logoData));
        jsonSaveData.backgroundImg = logoData.backgroundImg;
    }else{
        var jsonSaveData = JSON.parse(JSON.stringify(saveData));
        jsonSaveData.backgroundImg = saveData.backgroundImg;
    }

    /**
     * Send data to local storage
     */
    let storageData = localStorage.getItem("emoEditorData");
    if(!storageData){
        storageData = {
            [uploadedLogoData.postID]: {
                [activeImageID]: {
                    logoData: jsonSaveData,
                    newImage: image
                }
            }
        }
    }else{
        storageData = JSON.parse(storageData);
        if(!storageData[uploadedLogoData.postID] || storageData[uploadedLogoData.postID]== 'undefined'){
            storageData[uploadedLogoData.postID] = {
                [activeImageID]: {
                    logoData: jsonSaveData,
                    newImage: resultImage
                }
            }
        }else{
            storageData[uploadedLogoData.postID][activeImageID] = {
                logoData: jsonSaveData,
                newImage: resultImage
            }
        }
        localStorage.removeItem("emoEditorData");
    }
    localStorage.setItem('emoEditorData',  JSON.stringify(storageData));
    saveBtn.style.display = 'none';
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