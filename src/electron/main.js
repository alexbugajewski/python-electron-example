const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn }  = require('child_process');
let flaskApp = null;


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

    flaskApp = spawn('python', ['../py/server.py'], { shell: true });
    flaskApp.on('error', err => {
        console.log("Error: " + err);
    })

    flaskApp.on('spawn', () => {
        console.log("Server running...");
    })
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
    flaskApp.kill();
  });


// Event handler for asynchronous incoming messages
ipcMain.on('asynchronous-message', (event, args) => {
    console.log("Called async ipc");
 
    // Event emitter for sending asynchronous messages
    let pyPath = path.join(__dirname, '..', 'py', 'server.py');
    let python_process = spawn('python', [pyPath, '10', '15']);
    console.log(python_process.pid);
    python_process.stdout.on('data', (data) => {
        console.log(JSON.parse(data).result);
        event.sender.send('asynchronous-reply', JSON.parse(data));
    })
    
 })
 