const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  authApi: {
    sendCredentials(credentials) {
      return ipcRenderer.invoke('loginAttempt', credentials);
    }
  }
})

// ipcRenderer.on('profileData', (event, profile) => {
//   // Use the profile data in your frontend code
//   console.log('Received profile:', profile);
// });