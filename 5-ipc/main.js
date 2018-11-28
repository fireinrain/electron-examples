"use strict";


console.log("main process working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

const ipc = require("electron").ipcMain;
const dialog = electron.dialog;

let win;

function createWindow() {
    win = new BrowserWindow({
        show:false
    });
    win.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file',
        slashes:true
    }));

    win.once("ready-to-show",function(){
        win.show();
    });

    //开启devtools

    win.webContents.openDevTools();

    win.on("close",()=>{
        win = null;
    });
}

//5-ipc listen
ipc.on("open-error-dialog",function(){
    dialog.showErrorBox("An error message","Demo of error message");
    event.sender.send("opened-error-dialog","Main process opended the error dialog");
});


//5-ipc async
ipc.on("async message",function(event,args){
    console.log("asyncBtn send info: "+args);
    event.sender.send("async-reply","async message reply");
});

//5-ipc sync
ipc.on("sync message",function(event,data){
    event.returnValue = "sync-reply";
    console.log("syncBtn send Info: "+data);
});

app.on("ready",createWindow);
app.on("window-all-closed",()=>{
    if (process.platform!== "darwin") {
        app.quit()
    }
});
app.on("activate",()=>{
    if (win===null) {
        createWindow()
    }
});
