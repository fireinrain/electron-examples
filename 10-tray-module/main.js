"use strict"


console.log("main process working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
//常驻栏图标
const Tray = electron.Tray
const iconPath = path.join(__dirname,'electron.png')
const Menu  = electron.Menu;



let win;
let tray = null;

function createWindow() {
    win = new BrowserWindow();
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

    //常驻图标
    tray = new Tray(iconPath);
    let template = [
        {
            label:'Audio',
            submenu:[
                {
                    label: 'Low',
                    type:'radio',
                    checked:true
                },
                {
                    label:'High',
                    type:'radio'
                }
            ]

        },
        {
            label:'Video',
            submenu:[
                {
                    label:'1280x720',
                    type:'radio',
                    checked: true
                },
                {
                    label:'1920x1080',
                    type:'radio'
                }
            ]
        }
    ]

    const contextMenu = Menu.buildFromTemplate(template);
    //给图标设置菜单
    tray.setContextMenu(contextMenu);
    //设置图标提示
    tray.setToolTip("electron app")
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
