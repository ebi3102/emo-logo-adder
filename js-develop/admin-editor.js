import { adminFabric } from "./editors/admin-fabric";

let imgsBtn = document.getElementsByClassName('thumbnail-editor');
for (let item of imgsBtn) {
    item.addEventListener('click', function(e){
        canvasContainer.innerHTML = '';
        adminFabric(this.src, this.getAttribute('data-id'));
        popupScreenLocker.style.display = 'block';
        noticeContainer.innerHTML = '';
    });
}


