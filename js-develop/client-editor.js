import { drop, dragEnter, dragLeave, dragOver, fetchClick } from "./controllers/upload-events";
import { clientFabric } from "./editors/client-fabric";

// Upload section
clientLogoUploader.onclick = ()=>{
    let figure = document.querySelector('figure.woocommerce-product-gallery__wrapper');
    var activeSrc;
    if(figure.querySelector('div.flex-active-slide')){
        activeSrc = figure.querySelector('div.flex-active-slide').querySelector('a').href;
    }else{
        activeSrc = figure.querySelector('div').querySelector('a').href;
    }
    let object = canvasData.logoData;
    var activeImageID = null;
    var activeLogoSrc = null;
    for (const property in object) {
        if(object[property].backgroundImg == activeSrc){
            activeImageID = property;
            activeLogoSrc = object[property].src;
        }
    }
    if(activeImageID){
        defaultLogoImg.src = activeLogoSrc;
        popupScreenLocker.style.display = 'block';
        popupUploadContainer.style.display = 'block';
    }else{
        alert('The logo editor is not active for this image');
    }
};

let closeBtn = document.getElementsByClassName('close-icon');
for (let item of closeBtn) {
    item.onclick = ()=>popupScreenLocker.style.display = 'none';
}

dropContainer.onclick = fetchClick;
UploadLogo.onclick = fetchClick;

dropContainer.addEventListener('dragenter', dragEnter);
dropContainer.addEventListener('dragover', dragOver);
dropContainer.addEventListener('dragleave', dragLeave);
dropContainer.addEventListener('drop', drop);
// End of Upload section

//Set Logo to editor
/**
 * TODO: Fix the bug of variation
 */
var setToEditorContainer = document.getElementById('popupScreenLocker');
setToEditorContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('set-to-editor')) {
        popupScreenLocker.style.display = 'none';
        var logoSource = event.target.getAttribute('logo-source');
        clientFabric(logoSource);
    }
});

/**
 * Add Printed product price in below of select list
 * 
 * TODO: use save_item_local to add printed product and its qty to local storage
 */
var cartForm = document.querySelector('form.cart');
cartForm.addEventListener('click', function(event) {
    if (event.target.getAttribute('id') == 'printedProductsList') {
        if(event.target.value){
            let queryID = `option[id='${event.target.value}']`;
            let option = event.target.querySelector(queryID);
            const priceHTML = option.getAttribute('data-price');
            let priceContainer = document.querySelector('#priceContainer');
            if(priceContainer){
                priceContainer.innerHTML = '';
                priceContainer.innerHTML = priceHTML;
            }else{
                priceContainer = document.createElement('div');
                priceContainer.setAttribute('id', 'priceContainer');
                priceContainer.innerHTML = priceHTML;
                event.target.parentNode.insertBefore(priceContainer, event.target.nextSibling);
            }
            document.cookie = "printedProduct=" +  event.target.value;
            document.cookie = "printedProductParent="+ uploadedLogoData.postID;
        }
    }
});

/**
 * Get the quantity number from qty input
 */
var qtyNumberelem = document.querySelector('input.qty');
qtyNumberelem.addEventListener('change', function(e){
    document.cookie = "qtyNumbere="+ qtyNumberelem.value;
});
