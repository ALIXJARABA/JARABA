var http = require("http");
var url = require ('url');
var {info,error} = require('./modulos/my-logs');
var consts = require ("../libs/firebase");
var firebase = require ("../libs/firebase");
var {countries} = require('countries-list');
var querystring = require("querystring");

var server = http.createServer(function(request, response) {
var parsed = url.parse(request.url);
console.log("parsed:", parsed);
var pathname = parsed.pathname
var query = querystring.parse(parsed.query)
  console.log("query",query);

  if (pathname === "/") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>hello</p></body></html>");
    response.end();
  } 
  else if (pathname === "/info") {
    response.writeHead(200, { "Content-Type": "text/html" });
    var result = info(request.url);
    response.write(result);
    response.end();
  }

  else if (pathname === "/country") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(countries[query.code]));
    response.end();
  }



  else if (pathname === "/error") {
    response.writeHead(200, { "Content-Type": "text/html" });
    var result = error(request.url);   
    response.write(result);
    response.end();
  }
  else if (pathname === "/exit") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<html><body><p>exit</p></body></html>");
        response.end();
  }

  else  {
    response.writeHead(404, { "Content-Type": "text/html" });
     response.write("<html><body><p>not found</p></body></html>");
     response.end();
 
    
 }  
   
});
server.listen(4000);
console.log("corriendo");
