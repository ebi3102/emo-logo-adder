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


// var imageElemInput = document.createElement('input');
// imageElemInput.name =  'imageData';
// imageElemInput.type = 'hidden';

hiddenInput.value = localData;

formCheckout.appendChild(hiddenInput);
    
