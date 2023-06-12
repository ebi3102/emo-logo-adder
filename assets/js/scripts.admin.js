jQuery('document').ready(function($){
    $('#addEditorPopUp').click(function(e){
        e.preventDefault();
        $('.popup-screen-locker').css('display', 'block');
        $('.popup-editor-container').css('display', 'block');
    })

    $('#emoClose').click((e)=>{
        $('.popup-screen-locker').css('display', 'none');
        $('.popup-editor-container').css('display', 'none');
    })

});