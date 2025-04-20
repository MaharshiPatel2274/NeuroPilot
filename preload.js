const { contextBridge, ipcRenderer } = require('electron');
console.log('Preload: script loaded');

contextBridge.exposeInMainWorld('novaAPI', {
  getPageText: () => {
    console.log('Preload: getPageText called');
    return ipcRenderer.invoke('get-page-text');
  },
  summarizePage: (text) => {
    const limitedText = text.slice(0, 10000); // Limit to 100 characters
    console.log('Preload: summarizePage called, text length=', limitedText.length);
    return ipcRenderer.invoke('summarize-text', limitedText);
  }
});