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
    
    webview.addEventListener('did-fail-load', (event) => {
        // event.errorCode === -3 means ERR_ABORTED (harmless YouTube redirect abort)
        if (event.errorCode === -3) {
        // just ignore it
        return;
        }
        console.error('WebView load failed:', event);
    });
  
    goButton.addEventListener('click', navigate);
    urlInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') navigate();
    });
  });
  