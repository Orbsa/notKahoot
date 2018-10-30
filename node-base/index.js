

const app = require('express')();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var testQuiz = require("./QuizCreationExample.js"); //This is just for testing. 

app.get("/",function(req,res){
	res.sendFile(__dirname + "/home.html");
})


app.get("/editQuiz",function(req,res){
	res.sendFile(__dirname + "/editQuiz.html");
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

app.get("/proctorLanding",function(req,res){
    res.sendFile(__dirname + "/proctorLanding.html");
})

app.get("/userclient", function(req,res){
	res.sendFile(__dirname + "/userclient.html");
})

io.on('connection', function(socket){
	console.log('user connected');

	socket.on('start-quiz' ,function(data){
		console.log("The quiz id: "+data);
		startQuiz(data,socket);
	});

	socket.on('disconnect', function(){
		console.log('user left');
	});
});


//Function for the protocol of a quiz. 
function startQuiz(quizId,socket){

	socket.emit('quiz-client',{
		    name : testQuiz.name+ quizId,
		    // question : testQuiz.questions[0]
		});
}

// console.log(testQuiz.name);

http.listen(3450, ()=>console.log("Server at Localhost:3450"));
