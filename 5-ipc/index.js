
const electron = require("electron");

const ipc = electron.ipcRenderer;

const errorBtn = document.getElementById("errorBtn");

errorBtn.addEventListener("click",function(){
    ipc.send("open-error-dialog");
});

function addInfo(infos){
    let divs = document.getElementById("mainProcess");
    divs.innerHTML = infos;
}


ipc.on("opened-error-dialog",function(event,args){

    addInfo(args);
    console.log(args);
});

//async 5-ipc
const asyncBtn = document.getElementById("asyncBtn");
asyncBtn.addEventListener("click",function(){
    console.log("async msg 1");
    ipc.send("async message","I want fuck you!");
    console.log("async msg 2");
});
ipc.on("async-reply",function(event,args){
    console.log("handle the reply from main process");
    console.log(args);
});

//sync 5-ipc
const syncBtn = document.getElementById("syncBtn");
syncBtn.addEventListener("click",function(){
    console.log("sync msg 1");
    const reply = ipc.sendSync("sync message","That's a nice girl!");
    console.log(reply);
    console.log("sync msg 2");
});


//remote 用的就是同步的ipc
let BrowserWindow = require("electron").remote.BrowserWindow;

let renderWin = new BrowserWindow({
    title:"Java is good!"
});

renderWin.loadURL("https://en.wikipedia.org");

