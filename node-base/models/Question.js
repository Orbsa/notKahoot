'use strict';

// how to query: http://docs.sequelizejs.com/manual/tutorial/querying.html

module.exports = (sequelize, DataType) => {
	var Question = sequelize.define('Question', {
		text = DataType.TEXT,
	});

	Question.associate = function(models){
		models.Question.hasMany(models.Answers);
	};

	return Question;
};