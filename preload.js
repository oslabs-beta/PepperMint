const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  authApi: {
    sendCredentials(credentials) {
      return ipcRenderer.invoke('loginAttempt', credentials);
    },
    submitCredentials(credentials) {
      return ipcRenderer.invoke('signupAttempt', credentials);
    },
    increment(username){
      return ipcRenderer.invoke('increment', username);
    },
    getCount(username){
      return ipcRenderer.invoke('getCount', username);
    }
  }
})

// ipcRenderer.on('profileData', (event, profile) => {
//   // Use the profile data in your frontend code
//   console.log('Received profile:', profile);
// });