import { drop, dragEnter, dragLeave, dragOver, fetchClick } from "./controllers/upload-events";

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
var setToEditorContainer = document.getElementById('popupScreenLocker');
setToEditorContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('set-to-editor')) {
        var logoSource = event.target.getAttribute('logo-source');
        console.log(logoSource);
        console.log("logoSource");
    }
});

