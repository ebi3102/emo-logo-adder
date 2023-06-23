export {dragEnter, dragOver, dragLeave, drop, fetchClick}

import { fetchData } from "./upload-fetch-controls";

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragOver(e) {
    e.preventDefault();
    e.target.classList.add('drag-over');
}

function dragLeave(e) {
    e.target.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.remove('drag-over');
    // get the draggable element
    const logoFile = e.dataTransfer.files[0];
    // AJAX
    fetchData(uploadedLogoData, dropContainer, noticeContainer, logoFile)
}


function fetchClick(){
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', function() {
        const logoFile = fileInput.files[0];
        fetchData(uploadedLogoData, dropContainer, noticeContainer, logoFile)
      });
    
      document.body.appendChild(fileInput);
      fileInput.click(); 
}