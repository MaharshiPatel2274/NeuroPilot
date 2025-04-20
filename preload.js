const { contextBridge, ipcRenderer } = require('electron');
console.log('Preload: script loaded');

contextBridge.exposeInMainWorld('novaAPI', {
  getPageText: () => {
    console.log('Preload: getPageText called');
    return ipcRenderer.invoke('get-page-text');
  },
  summarizePage: (text) => {
    console.log('Preload: summarizePage called, text length=', text.length);
    return ipcRenderer.invoke('summarize-text', text);
  }
});