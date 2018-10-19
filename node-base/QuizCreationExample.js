var Quiz = require("./Quiz.js");
var Question = require("./Question.js");
var Answer = require("./Answer.js");

//Make a quiz obj
quiz1 = new Quiz.quiz("Star Wars",'jabba'); //Not this has to be Quiz.quiz becuase Quiz also has quizFromClientCreator()


//Make some questions
question1 = new Question("Where is Han Solo?");
question2 = new Question("What is pizza hut?");

//Place some answers in those questions
question1.answers.push(new Answer("Tatooeen"));
question1.answers.push(new Answer("Naboo"));
question1.answers.push(new Answer("Imprisoned on the Death Star"));

question2.answers.push(new Answer("A very good place to get a bite to eat"));
question2.answers.push(new Answer("The home of the might pizza dweller"));
question2.answers.push(new Answer("Famous dish of the Sand People."));

//Add Those quiestions

quiz1.questions.push(question1);
quiz1.questions.push(question2);


console.log(quiz1);
