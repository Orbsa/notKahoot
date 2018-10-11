//This can be added to a node file using: var Quiz = require("./Quiz.js");
//A new quiz can be created by: q1 = new Quiz.quiz("Rock and Roll","Andrew");



var quiz = {
    quiz: function (name,moderator) { 
        this.name = name; //Name of quiz. 
        this.questions =[]; //List of questions on quiz.
        this.users = []; //Users currently on quiz.
        this.moderator = moderator; // Owner of the quiz.
    }
};

quizFromClientCreator = function(quizobj,moderatorName){
    q= new quiz.quiz(quizobj.name,moderatorName);
    q.questions = quizobj.questions;

    return q
} 

module.exports.quiz=quiz;
module.exports.quizCreator=quizFromClientCreator;


//Comunications for quizCreator

/*
On server:

socket.on('create-quiz',function(quizobj){
        q = quizFromClientCreator(quizobj,"<name>");
        console.log(q);
      });


On Client:

    socket.emit('create-quiz', quiz);
*/