const { app, BrowserWindow, ipcMain, ipcRenderer, net} = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    win.loadFile(path.join(__dirname, 'index.html'));
}


app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
      });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
  });


ipcMain.handle('post-request',(event, data) => {
    const request = net.request({
        method: 'POST',
        protocol: 'http:',
        hostname: '127.0.0.1',
        port: 5000,
        path: '/',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
          }
    })

    console.log("REQUEST:" + request);

    request.on('response', (response) => {
        event.returnValue = response;
    });
    request.write(data);
    request.end();
})