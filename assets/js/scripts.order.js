document.querySelector('form[name=checkout]').addEventListener('submit', function(event){
    // event.preventDefault();
    // var localData = localStorage.getItem('emoEditorData');
    // var hiddenInput = document.createElement('input');
    // hiddenInput.type = 'hidden';
    // hiddenInput.name = 'emoEditorData';
    // hiddenInput.value = localData;
    // this.appendChild(hiddenInput);
    localStorage.removeItem("emoEditorData");
    
});

var formCheckout = document.querySelector('form[name=checkout]');
var localData = localStorage.getItem('emoEditorData');


// var logosData = {};
// var images = []
// objLocalData = JSON.parse(localData);
// var formData = new FormData();
// for (const postID in objLocalData) {
//     logosData[postID] = {};
//     for(imageID in objLocalData[postID]){
//         logosData[postID][imageID] = objLocalData[postID][imageID].logoData;
//         // images.push(objLocalData[postID][imageID].newImage)
//         var imageData = objLocalData[postID][imageID].newImage;
//         var binaryData = atob(imageData.split(',')[1]);
//         var blob = new Blob([binaryData], { type: 'image/png' });
//         formData.append('image', blob, 'image.png');
//     }
// }

var logosElemInput = document.createElement('input');
logosElemInput.name =  'logoData';
logosElemInput.type = 'hidden';
logosElemInput.value =  localData;

// var imageElemInput = document.createElement('input');
// imageElemInput.name =  'imageData';
// imageElemInput.multiple = true;
// imageElemInput.type = 'hidden';
//
// imageElemInput.value = JSON.stringify(formData);


console.log("input_Value: ", logosElemInput.value);

formCheckout.appendChild(logosElemInput);
// formCheckout.appendChild(imageElemInput);


