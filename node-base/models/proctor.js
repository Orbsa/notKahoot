'use strict';
module.exports = (sequelize, DataTypes) => {
  const proctor = sequelize.define('proctor', {
    username: DataTypes.STRING,
    quizScore: DataTypes.INTEGER
  }, {});
  proctor.associate = function(models) {
    // associations can be defined here
    proctor.hasMany(models.quiz);
  };
  return proctor;
};