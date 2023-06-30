// document.querySelector('form[name=checkout]').addEventListener('submit', function(event){
//     event.preventDefault();
//     var localData = localStorage.getItem('emoEditorData');
//     var hiddenInput = document.createElement('input');
//     hiddenInput.type = 'hidden';
//     hiddenInput.name = 'emoEditorData';
//     hiddenInput.value = localData;
//     this.appendChild(hiddenInput);
    
// });

var formCheckout = document.querySelector('form[name=checkout]');
var localData = localStorage.getItem('emoEditorData');

var hiddenInput = document.createElement('input');
hiddenInput.type = 'hidden';
hiddenInput.name = 'emoEditorData';

var logosData = {};
var images = []
objLocalData = JSON.parse(localData);
for (const postID in objLocalData) {
    logosData[postID] = {};
    for(imageID in objLocalData[postID]){
        logosData[postID][imageID] = objLocalData[postID][imageID].logoData;
        images.push(objLocalData[postID][imageID].newImage)
    }
}

var logosElemInput = document.createElement('input');
logosElemInput.name =  'logoData';
logosElemInput.type = 'hidden';
logosElemInput.value = logosData;

var imageElemInput = document.createElement('input');
imageElemInput.name =  'imageData[]';
imageElemInput.multiple = true;
imageElemInput.type = 'hidden';

imageElemInput.value = images;

formCheckout.appendChild(logosElemInput);
formCheckout.appendChild(imageElemInput);


