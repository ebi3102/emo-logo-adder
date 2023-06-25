import { drop, dragEnter, dragLeave, dragOver, fetchClick } from "./controllers/upload-events";
import { clientFabric } from "./editors/client-fabric";

// Upload section
clientLogoUploader.onclick = ()=>{
    popupScreenLocker.style.display = 'block';
    popupUploadContainer.style.display = 'block';
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
        }
    }
});
