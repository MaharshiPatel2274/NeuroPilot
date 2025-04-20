require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const llmService = require('./llmService');
let mainWindow;

function createWindow() {
  mainWindow= new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      webviewTag: true
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'views', 'landing.html'));
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
    console.log('Extracted page text:', text); // log first 100 chars
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
// IPC: provide wellness-based work advice
ipcMain.handle('get-work-advice', async (event, healthData) => {
  const { bp, sleep, steps } = healthData;

  console.log(`Generating work advice for BP: ${bp}, Sleep: ${sleep}, Steps: ${steps}`);

  const prompt = `
You are a helpful wellness assistant.
The user provided the following data:
- Blood Pressure: ${bp}
- Sleep Duration: ${sleep} hours
- Step Count: ${steps}

The user-defined health standards are:
- Ideal BP: 90 to 130
- Minimum Sleep: 7 hours
- Minimum Steps: 5000

Based on these inputs and standards, provide a 2-line personalized message that advises whether the user should keep working or take a break.
`;

  try {
    const advice = await llmService.handleQuery('demo-user', prompt, 'summarize');
    console.log('LLM work advice:', advice);
    return advice;
  } catch (err) {
    console.error('Error generating work advice:', err);
    return 'Unable to generate advice right now.';
  }
});
