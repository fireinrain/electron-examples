const electron = require("electron");

const ipc = electron.ipcRenderer;

const contextDiv = document.getElementById("7-context-menu");

ipc.on("7-context-menu",function(event,data){
    contextDiv.innerHTML = data;
})
