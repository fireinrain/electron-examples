"use strict"


console.log("main process working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");


let win;
let dimWindow;
let colorWindow;
let noFrameWindow;

let parentWindow,childWindow;

function createWindow() {
    /*
     win = new BrowserWindow();

    //  定义宽度
    dimWindow = new BrowserWindow({
        width:400,height:400,maxWidth:600,maxHeight:600
    });

    // 定义背景
    colorWindow  =  new BrowserWindow({
        backgroundColor: "#eee"
    });

    //无边框
    noFrameWindow = new BrowserWindow({
        backgroundColor:"#e23e",frame:false
    })
    */

    parentWindow = new BrowserWindow({
        title:"parentWindow"
    });
    childWindow = new BrowserWindow({
        show:false,
        parent:parentWindow,
        modal:true,
        title:"childWindow"
    });
    childWindow.loadURL("https:www.youtube.com");

    childWindow.once("ready-to-show",()=>{
        childWindow.show()
    });



   
    

   
}

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