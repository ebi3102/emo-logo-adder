document.querySelector('form[name=checkout]').addEventListener('submit', function(event){
    // event.preventDefault();
    var localData = localStorage.getItem('emoEditorData');
    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'emoEditorData';
    hiddenInput.value = localData;
    this.appendChild(hiddenInput);
    
});