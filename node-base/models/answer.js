'use strict';
module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    text: DataTypes.STRING,
    votes: DataTypes.INTEGER
  }, {});
  answer.associate = function(models) {
    // associations can be defined here
    answer.belongsTo(models.question, {
    	onDelete: "CASCADE",
    	foreignKey: {
    		allowNull: false
    	}
    });
  };
  return answer;
};