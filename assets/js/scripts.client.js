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

dropContainer.onclick = fetchClick;
UploadLogo.onclick = fetchClick;

dropContainer.addEventListener('dragenter', dragEnter);
dropContainer.addEventListener('dragover', dragOver);
dropContainer.addEventListener('dragleave', dragLeave);
dropContainer.addEventListener('drop', drop);


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


function fetchData(uploadedLogoData, dropContainer, noticeContainer, file) {

    var loadingImg = document.createElement('img');
    loadingImg.src = uploadedLogoData.loadingSrc;
    loadingImg.classList.add('loading-image');
    var previousHTML = dropContainer.innerHTML;
    dropContainer.innerHTML = loadingImg.outerHTML;
  
    var data = new FormData();
    data.append('action', uploadedLogoData.action);
    data.append('nonce', uploadedLogoData.nonce);
    data.append('logoImage', file);
  
    fetch(uploadedLogoData.ajax_url, {
        method: "POST",
        credentials: 'same-origin',
        body: data
      })
      .then((response) => response.text())
      .then((responseData) => {
        if (responseData) {
            responseData = JSON.parse(responseData);
            loadingImg.remove();
            dropContainer.innerHTML = previousHTML;
            if(responseData.error){
                noticeContainer.innerHTML = responseData.error;
            }else{
                var newLogo = document.createElement('img');
                newLogo.src = responseData.logSrc;
                newLogo.classList.add('loaded-logo');
                dropContainer.innerHTML = newLogo.outerHTML;
            }
            // dropContainer.innerHTML = responseData;
        }
      })
      .catch((error) => {
        alert(error);
        loadingImg.remove();
        dropContainer.innerHTML = previousHTML;
      });
  }
