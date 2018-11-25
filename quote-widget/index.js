let request = require("request")

let  quoteApi = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=";


function fetchTheQuote(apiUrl) {
    request(apiUrl,function (error,response,body) {
    let bodyJson = JSON.parse(body);
    let randomQuete = bodyJson[0]["content"];
    document.getElementById("quote").innerHTML = randomQuete;
})
}
//第一次就加载quote
fetchTheQuote(quoteApi);
//然后每5秒加载一次
setInterval(function () {
    fetchTheQuote(quoteApi);
},5000);