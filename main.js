const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const User = require('./models/UserModel');

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
  try{
    const user = await User.findOne({username: credentials.username});
    console.log(user);
    if(user === null){
      return 'wrong-username';
    }
    else if(user.password !== credentials.password){
      return 'wrong-password';
    }
    return 'login-successful';
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
  }
  catch(err){
    console.log('ERROR AT LOGIN: ', err);
  }
})

ipcMain.handle('signupAttempt',  async (event, credentials) => {
  try{
    await User.create({username: credentials.username, password: credentials.password})
    return 'signup-successful';
  }
  catch(err){
    console.log('ERROR AT SIGNUP: ', err);
  }
})

// ipcMain.on('loginAttempt', (_, credentials) => {
//   console.log(credentials);
// })

app.whenReady().then(createMainWindow)

