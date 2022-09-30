module.exports = {
  HOST: "server",
  USER: "intern",
  PASSWORD: "Qwerty123!",
  DB: "sql",
  dialect: "mssql",
  options: {
    database: 'Sqldata',
    trustServerCertificate: true
},


  pool: {
    max: 5, 
    min: 0, 
    acquire: 30000,
    idle: 10000
  } 
};
  