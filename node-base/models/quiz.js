'use strict';
module.exports = (sequelize, DataTypes) => {
  const quiz = sequelize.define('quiz', {
    name: DataTypes.STRING,
  }, {});
  quiz.associate = function(models) {
    // associations can be defined here
    quiz.belongsTo(models.proctor, {
    	onDelete:"CASCADE",
    	foreignKey: {
    		allowNull: false
    	}
    });

    quiz.hasMany(models.question);
  };
  return quiz;
};