'use strict';

// how to query: http://docs.sequelizejs.com/manual/tutorial/querying.html

module.exports = (sequelize, DataTypes) => {
	var Answer = sequelize.define('Answer', {
		text = DataTypes.TEXT,
		votes = DataTypes.INTEGER
	});

	return Answer;
};