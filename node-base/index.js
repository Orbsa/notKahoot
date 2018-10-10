const app = require('express')();
var http = require("http").Server(app);

app.get("/",function(req,res){
	res.sendFile(__dirname + "/home.html");
})

http.listen(3450, ()=>console.log("Server at Localhost:3450"));
