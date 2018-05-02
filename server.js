var http = require('http')
var fs = require('fs')
var url = require('url')
var qiniu = require("qiniu")
var port = process.argv[2]

if(!port){
    console.log('请指定端口号\nnode server.js 8888')
    process.exit(1)
}

var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method

    if(path==='/uptoken'){
        response.statusCode = 200
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.setHeader('Access-Control-Allow-Origin', '*')
        var config = fs.readFileSync("./qiniuKey.json")
        config = JSON.parse(config)
        var accessKey = config.accessKey
        var secretKey = config.secretKey
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        var options = {
            scope: "163cloudmusic",
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken = putPolicy.uploadToken(mac);
        response.write(`
            {
                "uptoken": "${uploadToken}"
            }
        `)
        response.end()
    } else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/json;charset=utf-8')
        response.end()
    }
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n http://localhost:' + port)