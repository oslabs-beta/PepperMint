const { app, ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const User = require('./models/UserModel');
const Count = require('./models/CountModel');

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
    console.log(credentials);
    if(user === null){
      return 'wrong-username';
    }
    else if(user.password !== credentials.password){
      return 'wrong-password';
    }
    return 'login-successful';
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

ipcMain.handle('increment', async (event, username) => {
  try{
    let newCount = await Count.findOne({username: username})
    await Count.findOneAndUpdate({username: username}, {count: ++newCount.count})
    return newCount.count;
  
  }
  catch(err){
    console.log('ERROR AT INCREMENT: ', err);
  }
})

ipcMain.handle('getCount', async (event, username) => {
  let newCount = await Count.findOne({username: username});
  console.log("USERNAME: ", username);
  if(newCount === null){
    await Count.create({username: username})
    return 0;
  }
  return newCount.count;
})

app.whenReady().then(createMainWindow)

