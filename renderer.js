window.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const goButton = document.getElementById('go-button');
    const webview   = document.getElementById('webview');
  
    function navigate() {
      let url = urlInput.value.trim();
      if (!/^https?:\/\//.test(url)) {
        url = 'http://' + url;
      }
      webview.loadURL(url);
    }
  
    goButton.addEventListener('click', navigate);
    urlInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') navigate();
    });
  });
  