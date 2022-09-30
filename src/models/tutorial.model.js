const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    // id: {
    //   type: Sequelize.UUID,
    //   primaryKey: true
    // },
    data: {
     type: Sequelize.CHAR(4000)
    },
    email: {
      type: DataTypes.STRING

    },
    password:{
      type: DataTypes.STRING

    },
    status:{
      type: DataTypes.INTEGER

    },
    role:{
      type: DataTypes.INTEGER

    }, 

    approvedAt:{
      type: DataTypes.DATE


    },
    createdAt:{
      type: DataTypes.DATE

    },
    approvedBy:{
      type: DataTypes.STRING


    }, 
// updatedAt: false,
  });

  return Tutorial;
};