// const { SequelizeMethod } = require("sequelize/types/utils");

module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    // data: {
      
    //   type: Sequelize.OBJECT
    // },
    data: {
      type: Sequelize.STRING,
    
    },
    // data: { 
    //   type: Sequelize.STRING,
    //   // ref: 'users'
    // },
  
    password: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.BOOLEAN
    },
    role: { 
      type: Sequelize.BOOLEAN
    }
  });

  return Tutorial;
};