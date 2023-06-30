export{fetchData}

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
    data.append('PostID', uploadedLogoData.postID)
  
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
            popupUploadContainer.style.display = 'none';
            setCustomLogoContainer.style.display = "block";

            var newLogo = document.createElement('img');
            newLogo.src = responseData.logSrc;
            newLogo.classList.add('loaded-logo');

            if(responseData.logoNOBGSrc){
                //set logo with background
                let imgContainer_1 = document.createElement('div');
                imgContainer_1.appendChild(newLogo);
                let btn_1 = document.createElement("div");
                btn_1.classList.add('emo-btn', 'primary', 'set-to-editor');
                btn_1.setAttribute('logo-source', newLogo.src);
                btn_1.textContent = "set with background";
                imgContainer_1.appendChild(btn_1);
                CustomLogoParts.appendChild(imgContainer_1);
                //set logo without background
                let imgContainer_2 = document.createElement('div');
                var newNOBGLogo = document.createElement('img');
                newNOBGLogo.src = responseData.logoNOBGSrc;
                newNOBGLogo.classList.add('loaded-logo');
                let imgDiv = document.createElement("div");
                imgDiv.style.backgroundColor = "#c9c9c942";
                imgDiv.appendChild(newNOBGLogo);
                imgContainer_2.appendChild(imgDiv);
                // imgContainer_2.appendChild(newNOBGLogo);
                let btn_2 = document.createElement("div");
                btn_2.classList.add('emo-btn', 'primary', 'set-to-editor')
                btn_2.setAttribute('logo-source', newNOBGLogo.src);
                btn_2.textContent = "set without background";
                imgContainer_2.appendChild(btn_2);
                CustomLogoParts.appendChild(imgContainer_2);
            }else{
                var imgContainer = document.createElement('div');
                imgContainer.style.width = "100%";
                imgContainer.appendChild(newLogo);
                var btn = document.createElement("div");
                btn.classList.add('emo-btn', 'primary', 'set-to-editor')
                btn.setAttribute('logo-source', newLogo.src);
                btn.textContent = "set";
                imgContainer.appendChild(btn);
                CustomLogoParts.appendChild(imgContainer);
            }
        }
    }
    })
    .catch((error) => {
    alert(error);
    loadingImg.remove();
    dropContainer.innerHTML = previousHTML;
    });
}