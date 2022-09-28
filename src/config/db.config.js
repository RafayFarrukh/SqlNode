module.exports = {
  HOST: "server",
  USER: "intern",
  PASSWORD: "Qwerty123!",
  DB: "Sqldata",
  dialect: "mssql",
//   options: {
//     database: 'NodeApp',
//     trustServerCertificate: true
// },
  pool: {
    max: 5,
    min: 0, 
    acquire: 30000,
    idle: 10000
  } 
};
  