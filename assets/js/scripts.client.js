// jQuery('document').ready(function($){
//     $('#ClientLogoUploader').click((e)=>{
//         alert('Hello Client Editor');
//     });
    
// })

clientLogoUploader.onclick = ()=>{
    popupScreenLocker.style.display = 'block';
    popupUploadContainer.style.display = 'block';
};

emoClose.onclick = ()=>{
    popupScreenLocker.style.display = 'none';
    popupUploadContainer.style.display = 'none';
}

dropContainer.addEventListener('dragenter', dragEnter);
dropContainer.addEventListener('dragover', dragOver);
dropContainer.addEventListener('dragleave', dragLeave);
dropContainer.addEventListener('drop', drop);

// UploadLogo.onclick = ()=>{
    
// }

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
    const file = e.dataTransfer.files[0];
    const fileReader = new FileReader();
    // fileReader.onload = () => {
    //     previewImage.src = fileReader.result;
    // };
    fileReader.readAsDataURL(file);

    // AJAX
    var loadingImg = document.createElement('img');
    loadingImg.src = uploadedLogoData.loadingSrc;
    loadingImg.classList.add('loading-image')
    var perviouseHTML = dropContainer.innerHTML;
    dropContainer.innerHTML = loadingImg.outerHTML;

    var data = new FormData();
    data.append('action', uploadedLogoData.action);
    data.append('nonce', uploadedLogoData.nonce);
    //   data.append('logoData', JSON.stringify(saveData));
    
    fetch( uploadedLogoData.ajax_url,{
        method: "POST",
        credentials: 'same-origin',
        body: data
    })
    .then((response) => response.text())
    .then((data) => {
        if (data) {
            loadingImg.remove();
            dropContainer.innerHTML = perviouseHTML;    
            noticeContainer.innerHTML = data; 
        }
    })
    .catch((error) => {
        alert(error);
        console.error(error);
    });
}
