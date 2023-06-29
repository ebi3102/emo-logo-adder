document.querySelector('form[name=checkout]').addEventListener('submit', function(event){
    event.preventDefault();
    var localData = localStorage.getItem('emoEditorData');
    console.log(localData);
});  