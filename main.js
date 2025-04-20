require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const llmService = require('./llmService');
let mainWindow;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true
    }
  });
  win.loadFile(path.join(__dirname, 'views', 'landing.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC: get raw page text from <webview>
ipcMain.handle('get-page-text', async () => {
  console.log('IPC Main: get-page-text invoked');
  try {
    const text = await mainWindow.webContents.executeJavaScript(
      `document.querySelector('webview').executeJavaScript("document.body.innerText")`
    );
    console.log('Extracted page text length=', text.length);
    return text;
  } catch (err) {
    console.error('Error extracting page text:', err);
    return '';
  }
});

// IPC: summarize text via LLM
ipcMain.handle('summarize-text', async (event, text) => {
  console.log('IPC Main: summarize-text invoked, text length=', text.length);
  try {
    const summary = await llmService.handleQuery('demo-user', text, 'summarize');
    console.log('LLM summary result:', summary);
    return summary;
  } catch (err) {
    console.error('Error in LLM summarization:', err);
    return 'Error generating summary';
  }
});