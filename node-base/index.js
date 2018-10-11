const app = require('express')();
var http = require("http").Server(app);

app.get("/",function(req,res){
	res.sendFile(__dirname + "/home.html");
})

app.get("/createQuiz",function(req,res){
	res.sendFile(__dirname + "/createQuiz.html");
})

http.listen(3450, ()=>console.log("Server at Localhost:3450"));
