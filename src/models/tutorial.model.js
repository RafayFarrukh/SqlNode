const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  // const Tutorial = sequelize.define("tutorial", {
    const Tutorial = sequelize.define("Users2", {
      
     
    data: {
     type: Sequelize.STRING(2000)
    },
    email: {
      type: Sequelize.STRING(50)
 
    },
    password:{ 
      type: Sequelize.STRING(150)

    },
    status:{
      type: DataTypes.INTEGER

    },
   

    createdAt:{
      type: DataTypes.DATE
      
    },
    approvedAt:{
      type: DataTypes.DATE


    },
    approvedBy:{
      type: Sequelize.STRING(50)
 

    }, 
    role:{
      type: DataTypes.INTEGER

    }, 
    
 
      // updatedAt: false,
      },
      {updatedAt: false},
    
     
      );

  return Tutorial;  
  // return User;
};