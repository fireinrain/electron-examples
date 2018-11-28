const fs = require("fs");
const path = require("path");

const shell = require("electron").shell;

//UI Photonkit

let btnCreate = document.getElementById("btnCreate");
let btnRead = document.getElementById("btnRead");
let btnDelete = document.getElementById("btnDelete");

let fileName = document.getElementById("fileName");
let fileContents = document.getElementById("fileContents");

let pathName = path.join(__dirname,"Files");

btnCreate.addEventListener("click",function () {
    let file= path.join(pathName,fileName.value);
    let contents = fileContents.value;
    fs.writeFile(file,contents,function (error) {
        if (error){
            return console.log(error)
        }
        console.log("The file was created");
    })
});

btnRead.addEventListener("click",function () {
    //shell.showItemInFolder(pathName);
    //TODO 怎样实现electron 可以打开文件夹选择文件

    let file= path.join(pathName,fileName.value);

    fs.readFile(file,function (error,data) {
        if (error) {
            return console.log("Read file failed!")
        }
        let content = data.toString();
        fileContents.innerText = content;
    })
});

btnDelete.addEventListener("click",function () {
    let file= path.join(pathName,fileName.value);
    fs.unlink(file,function (error) {
        if (error){
            return console.log(error);

        }
        fileName.value = '';
        fileContents = '';
        console.log("delete file success");
    });
});
