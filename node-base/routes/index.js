var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

		var quiz2 = models.quiz.create({'name': 'most disliked races'}).then(quiz => {
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

router.get('/question', function(req, res, next) {
	if(req.query.id != null){
		models.question.findAll({
			where: {
				id: req.query.id
			}
		}).then(question => {
			var question = question[0];
			console.log(question);
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
})


module.exports = router;


