// confirm("你是小倩吗？")

console.log("render from index.js");

const path = require("path");
const url = require("url");
let window = require("electron").remote.BrowserWindow;

let newBtn = document.getElementById("createNew");

newBtn.addEventListener("click",function (event) {
   createNewWindow();
});


//创建一个新窗口
function createNewWindow() {
    win3 = new window();
    win3.loadURL(url.format({
        pathname:path.join(__dirname,'index3.html'),
        protocol:'file',
        slashes:true
    }));


    win3.webContents.openDevTools();

    win3.on("close",()=>{
        win = null;
    });
}
