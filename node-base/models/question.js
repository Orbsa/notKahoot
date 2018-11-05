'use strict';
module.exports = (sequelize, DataTypes) => {
  const question = sequelize.define('question', {
    text: DataTypes.STRING
  }, {});
  question.associate = function(models) {
    // associations can be defined here
    question.hasMany(models.answer);
    question.belongsTo(models.quiz, {
    	onDelete: "CASCADE",
    	foreignKey: {
    		allowNull: false
    	}
    });
  };
  return question;
};