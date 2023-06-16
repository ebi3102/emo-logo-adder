jQuery('document').ready(function($){
    // Show Edtior Modal
    $('#addEditorPopUp').click(function(e){
        e.preventDefault();
        $('.popup-screen-locker').css('display', 'block');
        $('.popup-editor-container').css('display', 'block');
    })

    // Close editor Modal
    $('#emoClose').click((e)=>{
        $('.popup-screen-locker').css('display', 'none');
        $('.popup-editor-container').css('display', 'none');
    })
});