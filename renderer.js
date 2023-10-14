const {ipcRenderer} = require('electron');

ipcRenderer.on('congrats', (event, message) => {
    alert(message);
})