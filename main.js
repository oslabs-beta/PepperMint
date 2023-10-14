const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');

const isDev = !app.isPackaged;

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html');
}

if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

ipcMain.handle('loginAttempt', async (event, credentials) => {
  
  console.log(credentials);
  return 'haha';
  // event.reply('test-event');
  // try{
  //   //find profile with same username
  //   // const profile = await Profile.findOne({username: req.body.username});
  //   if (profile === null || profile.password !== req.body.password){
  //   }
  //   else {
  //     mainWindow.webContents.send(‘profileData’, profile);
  //   }
  // }

  // event.send('test-event');

  // event.reply('loginAttempt', 
  //     {
  //       username: 'Will',
  //       password: 'codesmith'
  //     }
  //   );
})

// ipcMain.on('loginAttempt', (_, credentials) => {
//   console.log(credentials);
// })

app.whenReady().then(createMainWindow)

