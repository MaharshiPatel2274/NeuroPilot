window.addEventListener('DOMContentLoaded', () => {
  console.log('Renderer: DOMContentLoaded');
  const urlInput = document.getElementById('url-input');
  const goButton = document.getElementById('go-button');
  const webview  = document.getElementById('webview');

  function navigate() {
    let url = urlInput.value.trim();
    console.log('Renderer: navigate to', url);
    if (!/^https?:\/\//.test(url)) url = 'http://' + url;
    webview.loadURL(url);
  }
  goButton.addEventListener('click', navigate);
  urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') navigate();
  });

  const summarizeBtn = document.getElementById('summarize-button');
  const overlay      = document.getElementById('summarize-overlay');
  const closeBtn     = document.getElementById('close-overlay');
  const doSummarize  = document.getElementById('do-summarize');
  const resultArea   = document.getElementById('summary-result');

  summarizeBtn.addEventListener('click', () => {
    console.log('Renderer: summarize button clicked');
    overlay.style.display = 'flex';
  });
  closeBtn.addEventListener('click', () => {
    console.log('Renderer: close overlay clicked');
    overlay.style.display = 'none';
  });

  doSummarize.addEventListener('click', async () => {
    console.log('Renderer: doSummarize clicked');
    resultArea.value = 'Loading summary...';

    try {
      const pageText = await window.novaAPI.getPageText();
      console.log('Renderer: pageText length =', pageText.length);
      const summary = await window.novaAPI.summarizePage(pageText);
      console.log('Renderer: summary received =', summary);
      resultArea.value = summary;
    } catch (err) {
      console.error('Renderer: error during summarization', err);
      resultArea.value = 'Error generating summary';
    }
  });
});