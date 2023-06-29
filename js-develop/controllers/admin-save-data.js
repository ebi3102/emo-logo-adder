export {saveCanvasData}

function saveCanvasData(saveData){
      var data = new FormData();
      data.append('action', 'emo_la_admin_save');
      data.append('postID', emoSaveEditor.getAttribute('data_id'));
      data.append('nonce', emoSaveEditor.getAttribute('data-nonce'));
      data.append('logoData', JSON.stringify(saveData));
      // loadingImg.style.display = 'block';
      console.log(data);
      // fetch( wp_pageviews_ajax.ajax_url,{
      //   method: "POST",
      //   credentials: 'same-origin',
      //   body: data
      // })
      // .then((response) => response.text())
      // .then((data) => {
      //   if (data) {
      //     loadingImg.style.display = 'none';
      //     noticeContainer.innerHTML = data;
      //   }
      // })
      // .catch((error) => {
      //   alert(error);
      //   console.error(error);
      // });
}
