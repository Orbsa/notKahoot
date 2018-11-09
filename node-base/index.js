

const app = require('express')();
var http = require("http").Server(app);
var io = require('socket.io')(http);
var testQuiz = require("./QuizCreationExample.js"); //This is just for testing. 
var User = require("./User.js");

var routes = require("./routes/index.js")
app.use(routes)
app.set('view engine', 'jade');

var openQuizes = [];

console.log(testQuiz)

app.get("/",function(req,res){
	res.sendFile(__dirname + "/views/home.html");
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
	res.sendFile(__dirname + "/views/quizClient.html");
	
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
		openQuizes[data.quizId]=data;
		openQuizes[data.quizId]["proctorSocketId"] = socket.id;
		console.log(openQuizes[data.quizId]);
		console.log("Starting quiz id: "+data.quizId);
		startQuiz(openQuizes[data.quizId]);
	});

	socket.on('disconnect', function(){
		console.log('user left');
	});
});


//Function for the protocol of a quiz. 
function startQuiz(quizObj){
	console.log("here I am");
	// socket.emit('quiz-client',{
	// 		name : openQuizes[quizId].name,
	// 	    // question : testQuiz.questions[0]
	// 	});

	/// socket.on('start', function(){
	/// 	socket.emit('quiz-client',{
	/// 	    name : testQuiz.name+ quizId,
	/// 	    question : testQuiz.questions[0]
	///	});
	///});

	// quizObj.proctorSocketId.on("quiz-lobby-name", function(data){
	// 	if(quizId == data["quizId"]){
	// 		openQuizes[quizId].users.push(new User(data["name"]));
	// 		//Note: This socket sends to everything. So there is a check on the quiz client for quizId. 
	// 		io.emit("quiz-join-name", data);
	// 		console.log(data["name"]+ " joined quiz "+ data["quizId"]);
	// 	}
	// });


}

// console.log(testQuiz.name);

http.listen(3450, ()=>console.log("Server at Localhost:3450"));
