'use strict';

var models = require("../models");



module.export = {
	getNumberQuestions = function(qid){
		models.questions.findAll({
			where: {
				quizId: qid
			}
		}).then(questions => {
			return questions.length;
		})

	},

	getEntireQuiz = function(qid) {
		models.quiz.findAll({
			where: {
				id: qid
			}
		}).then(quiz => {
			
		})
	},

	getQuizesForProctor = function(pid) {
		models.quiz.findAll({
			where: {
				proctorId: pid
			}
		}).then(quizes => {
			return quizes;
		})
	}
}

