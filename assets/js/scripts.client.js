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
// UploadLogo.onclick = ()=>{
//     setCustomLogoContainer.style.display = "block";

//     if(responseData.logoNOBGSrc){

//     }else{

//     }

//     var setCustomLogoParts = document.createElement('div');
//     setCustomLogoParts.className = "upload-container";
//     setCustomLogoParts.appendChild(document.createElement('h2'));
//     setCustomLogoContainer.append(setCustomLogoParts);
// }

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
            console.log(responseData);
            responseData = JSON.parse(responseData);
            loadingImg.remove();
            dropContainer.innerHTML = previousHTML;
            if(responseData.error){
                noticeContainer.innerHTML = responseData.error;
            }else{
                popupUploadContainer.style.display = 'none';
                setCustomLogoContainer.style.display = "block";

                var newLogo = document.createElement('img');
                newLogo.src = responseData.logSrc;
                newLogo.classList.add('loaded-logo');

                var btn = document.createElement("div");
                btn.classList.add('btn primary set-to-editor');

                // if(responseData.logoNOBGSrc){

                // }else{
                    CustomLogoParts.appendChild(newLogo);
                    btn.setAttribute('logo-source', newLogo.src);
                    btn.textContent = "set";
                    CustomLogoParts.appendChild(btn);
                // }


                
                // dropContainer.innerHTML = newLogo.outerHTML;
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
