
const app = require('express')();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var testQuiz = require("./QuizCreationExample.js"); // This is just for testing. 
var User = require("./User.js");
var Quiz = require("./Quiz.js");
var Question = require("./Question.js");
var Answer = require("./Answer.js");
// var $ = require('jquery');
// require('bootstrap'); // Require this in one place for CSS

var routes = require("./routes/index.js")
app.use(routes)
app.set('view engine', 'pug');

var openQuizes = [];

app.get("/",function(req,res){
	res.render(__dirname + '/views/home');
	//res.sendFile(__dirname + "/views/home.html");
})

app.get("/editQuiz",function(req,res){
	res.sendFile(__dirname + "/views/editQuiz.html");
})

app.get("/createQuiz",function(req,res){
	res.sendFile(__dirname + "/views/createQuiz.html");
})

app.get("/proctorLogin",function(req,res){
	res.sendFile(__dirname + "/views/proctorLogin.html");
})

app.get("/registration",function(req,res){
    res.sendFile(__dirname + "/views/registration.html");
})

app.get("/quizClient",function(req,res){
	//Maybe a database check on req ?quizId could go here. 
	res.render(__dirname + "/views/quizClient");
	//res.sendFile(__dirname + "/views/quizClient.html");
	
})

app.get("/proctorLanding",function(req,res){
    res.sendFile(__dirname + "/views/proctorLanding.html");
})

app.get("/userClient", function(req,res){
	if(req.param('quizId') in openQuizes){
		// openQuizes[req.param('quizId')] = testQuiz;
		console.log("User wants to join quiz: "+ req.param('quizId'));
		res.sendFile(__dirname + "/views/userclient.html");
	}else{
		res.send("There is no open quiz with that id");
	}
	
})

io.on('connection', function(socket){
	console.log('user connected');

	socket.on('initialize-quiz' ,function(data){
		// console.log(data);
		//data's obj is like { quizId: '3',quizName: 'how to kill a man', quizQuestions: ...}
		openQuizes[data.quizId]=quizUnpacker(data);
		openQuizes[data.quizId]["proctorSocketId"] = socket.id;
		openQuizes[data.quizId]["userSocketIds"]=[];
		// console.log(openQuizes[data.quizId]);
		console.log("Starting quiz id: "+data.quizId);
		// startQuiz(openQuizes[data.quizId]);
	});

	socket.on('start-quiz',function(data){
		console.log(data);

		//Sending data to proctor
		io.sockets.connected[openQuizes[data.quizId].proctorSocketId].emit('quiz-client',{
			"name": openQuizes[data.quizId].name,
			"question": openQuizes[data.quizId].questions[0]
		});

		//Sending data to all the UserClients. 
		for (i in openQuizes[data.quizId].userSocketIds){
			io.sockets.connected[openQuizes[data.quizId].userSocketIds[i]].emit('quiz-client',{
				"name": openQuizes[data.quizId].name,
				"question": openQuizes[data.quizId].questions[0]
			});
		};


	})
	
	// Client Joins Quiz 
	socket.on("quiz-lobby-join", function(data){
			if (openQuizes.hasOwnProperty(data.quizId)){
				openQuizes[data.quizId].userSocketIds.push(socket.id) //Note this may be a good place to gather names for the quiz as well. 
				io.sockets.connected[openQuizes[data.quizId].proctorSocketId].emit("quiz-join-name", data);
				console.log("A user joined quiz "+data.quizId+" as "+data.name);
				// console.log(openQuizes[data.quizId]);
			}
			else consoleLog("Socket.IO exception: Socket ID: " + socket.id + " has sent data to invalid quiz ID: " + quizId);
	});

	// Client Answers Question 
	socket.on("quiz-answer-send", function(data){
			if (openQuizes.hasOwnProperty(data.quizId)){
				io.sockets.connected[openQuizes[data.quizId].proctorSocketId].emit("quiz-answer-send", data);
				console.log("Quiz ID: " + data.quizId + " - Client "+ data.userName + "Has voted for answer " +data.answerId);
				 // TODO: Add Vote to vote count & Send user their score.
			}
			else consoleLog("Socket.IO exception: Socket ID: " + socket.id + " has sent data to invalid quiz ID: " + quizId);
	});

	socket.on('disconnect', function(){
		console.log('user left');
	});
});

//The purpose of this function is to recieve a quiz from the quiz Client and unpack the info into a nicer quiz obj. 
function quizUnpacker(box){
	newQuiz = new Quiz.quiz(box.quizName)
	// console.log(box);
	for( i in box.quizQuestions ){
		question = new Question(box.quizQuestions[i].text);
		for( j in box.quizQuestions[i].answers){
			question.answers.push(new Answer(box.quizQuestions[i].answers[j].text))
		}
		newQuiz.questions.push(question);
	}

	return newQuiz;
}

http.listen(3450, ()=>console.log("Server at localhost:3450"));
