

const app = require('express')();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var testQuiz = require("./QuizCreationExample.js"); //This is just for testing. 


var openQuizes = [];

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
	//Here we check to see if there is that quiz in the database. 
	//For now we will just use the test quiz. 
	//TODO: add a database check and load here. 
	if(req.param('quizId')==3){
		openQuizes[3] = testQuiz;
		console.log("Loaded quiz: "+ testQuiz);
		res.sendFile(__dirname + "/quizClient.html");
	}
	else{
		res.send("There is no quiz with that id.");
	}

})

app.get("/proctorLanding",function(req,res){
    res.sendFile(__dirname + "/proctorLanding.html");
})

app.get("/userClient", function(req,res){
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

	socket.on('start', function(){
		socket.emit('quiz-client',{
		    name : testQuiz.name+ quizId,
		    question : testQuiz.questions[0]
		});
	});


}

// console.log(testQuiz.name);

http.listen(3450, ()=>console.log("Server at Localhost:3450"));
