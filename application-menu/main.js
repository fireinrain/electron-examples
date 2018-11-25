"use strict"


console.log("main process working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu =electron.Menu;


let win;

function createWindow() {
    win = new BrowserWindow({
        width:800,
        height:600
    });
    win.loadURL(url.format({
        pathname:path.join(__dirname,'index.html'),
        protocol:'file',
        slashes:true
    }));

    //开启devtools

    //win.webContents.openDevTools();

    win.on("close",()=>{
        win = null;
    });
}

app.on("ready",function(){
    createWindow()

    const menuTmplate = [
        {
            label:'Edit',
            submenu:[
                {role:'undo'},
                {role:'redo'},
                {type:'separator'},
                {role:'cut'},
                {role:'copy'},
                {role:'paste'},
                {role:'pasteandmatchstyle'},
                {role:'delete'},
                {role:'selectall'}
            ]
        },
        {
            label:"demo",
            submenu:[
                {
                    label:"submenu1",
                    click:function(){
                        console.log("submenu1 click");
                    }
                },
                {
                    type:'separator'
                },
                {
                    label:"submenu2"
                }
            ]
        },{
            label:'help',
            click:function () {
                electron.shell.openExternal("https://electronjs.org/");
            }
        }
    ];

    const menu = Menu.buildFromTemplate(menuTmplate);
    Menu.setApplicationMenu(menu);
});
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