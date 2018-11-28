

const fileBtn = document.getElementById("openFile");
const floderBtn = document.getElementById("openFolder");
const linkBtn = document.getElementById("openLink");

const shell = require("electron").shell;

fileBtn.addEventListener("click",function () {
    shell.showItemInFolder("E:\\pdf书籍\\think-in-java.pdf");
});

floderBtn.addEventListener("click",function(){
    shell.openItem("E:\\pdf书籍\\think-in-java.pdf");
});

linkBtn.addEventListener("click",function(){
    shell.openExternal("https:www.youtube.com");
});


