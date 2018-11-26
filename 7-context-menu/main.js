"use strict"


console.log("main process working");

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const ipc = electron.ipcMain;


let win;

function createWindow() {
    win = new BrowserWindow({
        width:800,height:600
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

app.on("ready",function () {
    createWindow();

    // 工具栏菜单
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

    const ctxMenu = new Menu();
    ctxMenu.append(new MenuItem({
        label:'Hello',
        click:function(){
            //主进程向渲染进程发消息
           win.webContents.send("7-context-menu","hello from the 7-context-menu!");

            console.log("hello from the 7-context-menu!");
        }
    }));

    ctxMenu.append(new MenuItem({role:"selectall"}));

    win.webContents.on("7-context-menu",function (event,params) {
        ctxMenu.popup(win,params.x,params.y)
    });
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
