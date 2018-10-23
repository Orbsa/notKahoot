

const app = require('express')();
var http = require("http").Server(app);
var io = require('socket.io')(http);

app.get("/",function(req,res){
	res.sendFile(__dirname + "/home.html");
})


app.get("/createQuiz",function(req,res){
	res.sendFile(__dirname + "/createQuiz.html");
})

app.get("/proctorLogin",function(req,res){
	res.sendFile(__dirname + "/proctorLogin.html");
})

app.get("/quizClient",function(req,res){
	res.sendFile(__dirname + "/quizClient.html");
})

io.on('connection', function(socket){
	console.log('user connected');
	socket.on('disconnect', function(){
		console.log('user left');
	});
});



http.listen(3450, ()=>console.log("Server at Localhost:3450"));
