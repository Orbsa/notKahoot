var express = require('express');
var router = express.Router();
var models = require("../models");
var Sequelize = require("sequelize");

var bodyParser= require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/* GET home page. */
router.get('/start', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//TODO:Take the req.body and put it in the database. 
router.post("/createQuizInDB",function(req,res){

	models.quiz.create({"text": req.body.quizName, "quizId": req.body.proctorId}).then(quiz => {
		req.body.questions.forEach(question =>{
			models.question.create({'quizId': quiz.id, 'text': question.questionText}).then(quest => {
				question.answersText.forEach(answer => {
					console.log(answer);
					models.answer.create({'text': answer, 'questionId': quest.id})
				});
			});
		});
	});
	res.send("Hope this works.")
})

router.get('/test', function(req, res, next){
	var proctor = models.proctor.create({'username':'suckmynuts', "quizScore": 69}).then(proctor => {
		var quiz1 = models.quiz.create({'name': 'how to kill a man', 'proctorId': proctor.id }).then(quiz => {
			var question1 = models.question.create({'text': 'where to aim', 'quizId': quiz.id}).then(question => {
				var answer1 = models.answer.create({'text': 'face/skull', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'left leg', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'go for the nuts', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'center of mass', 'votes': 0, 'questionId':question.id});
			});

			var question1 = models.question.create({'text': 'favorite weapon', 'quizId': quiz.id}).then(question => {
				var answer1 = models.answer.create({'text': 'boomerang', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'pocket knife', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'sticky notes', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'rpg', 'votes': 0, 'questionId':question.id});
			});
		});

		var quiz2 = models.quiz.create({'name': 'most disliked races',}).then(quiz => {
			var question1 = models.question.create({'text': 'select your least favorite race', 'quizId': quiz.id}).then(question => {
				var answer1 = models.answer.create({'text': 'russians', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'slovenians', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'greek', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'serbians', 'votes': 0, 'questionId':question.id});
			});

			var question1 = models.question.create({'text': 'now for eastern asia', 'quizId': quiz.id}).then(question => {
				var answer1 = models.answer.create({'text': 'Thailand', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'Sri Lanka', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'Phillipines', 'votes': 0, 'questionId':question.id});
				var answer1 = models.answer.create({'text': 'rpg', 'votes': 0, 'questionId':question.id});
			});
		});
	});

	var proctors = models.proctor.findAll();
	console.log(proctors);

	res.render('test', {'username': 'got HIM!!' });
});

router.get('/getdata', function(req, res, next) {
	return models.answer.findAll().then(answers => res.json(answers));
});


//Gives the question text and all answeres for a given question. 
router.get('/queryQuestionAnswers', function(req, res, next) {
	if(req.query.id != null){
		models.question.findAll({
			where: {
				id: req.query.id
			}
		}).then(question => {
			var question = question[0];
			// console.log(question);

			models.answer.findAll({
				where: {
					questionId: question.dataValues.id
				}
			}).then(answers => {
				question["dataValues"]["answers"] = answers;
				res.send(JSON.stringify(question));
			});
		});
	}
	else{
		res.send("something went wrong.")
	 }
})

//Gives all the quizzes for a given proctorID.  Ex. /quizzes?id=<Procotors id> 
router.get('/quizzes', function(req, res, next) {
	if(req.query.id != null){
		models.quiz.findAll({
			where: {
				proctorId: req.query.id
			}
		}).then(quizzes => {
			res.json(quizzes)
		});
	}
	else{
		res.send("something went wrong.")
	}
})

//Gives the quiz name with a get req of quizId. 
router.get('/queryQuiz', function(req, res, next) {
	if(req.query.id != null){
		models.quiz.findAll({
			where: {
				id: req.query.id
			}
		}).then(quiz => {
			 
			res.json(quiz[0]);
		});
	}
	else{
		res.send("something went wrong.")
	}
})

//Gives the questions text and id with a get req of quizId. 
router.get('/queryQuizQuestions', function(req, res, next) {
	if(req.query.id != null){
		models.question.findAll({
			where: {
				quizId: req.query.id
			}
		}).then(questions => {
			res.json(questions);
		});
	}
	else{
		res.send("something went wrong.")//Just the Question text.
	}
})


//Give the answers for and entire quiz with a get req of quizID
router.get('/queryQuizQuestionsAndAnswers', function(req, res, next) {
	if(req.query.id != null){
		const Op = Sequelize.Op;
		models.question.findAll({
			where: {
				quizId: req.query.id
			}
		}).then(questions => {
			// res.json(questions);
			questionIds=[];
			for( i in questions){
				questions[i].dataValues.answers=[];//initialize a list of answers. 
				questionIds.push(questions[i].dataValues.id);//Puts the ids in the questionIds list
			}
			models.answer.findAll({
				where:{
					questionId: {
						[Op.or]: questionIds
					  }
				}
			}).then(answers=>{
				// console.log(answers);
				// res.json(answers);
				for( i in questions){
					for( j in answers){
						if(questions[i].dataValues.id == answers[j].dataValues.questionId){
							questions[i].dataValues.answers.push(answers[j]);
						}
					}
				}
				// console.log(questions);
				res.json(questions);
			})



		});
	}
	else{
		res.send("something went wrong.")//Just the Question text.
	}
})



module.exports = router;

