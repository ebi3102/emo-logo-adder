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
