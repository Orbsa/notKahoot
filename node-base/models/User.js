'use strict';

// how to query: http://docs.sequelizejs.com/manual/tutorial/querying.html

module.exports = (sequelize, DataTypes) => {
	var User = sequelize.define('User', {
		username: DataTypes.STRING,
		quizScore: DataTypes.INTEGER

	});

	return User;
};