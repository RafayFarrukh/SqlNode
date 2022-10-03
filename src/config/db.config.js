module.exports = {


  HOST: "pakdoctorsksa.com",
  USER: "pdgksa",
  PASSWORD: "50siJ67~e",
  DB: "pdgksa",
  dialect: "mssql",
 



//   HOST: "server",
//   USER: "intern",
//   PASSWORD: "Qwerty123!",
//   DB: "sql",
//   dialect: "mssql",
//   define: {
//     updatedAt: false
// },
//   options: {
//     database: 'Sqldata',
//     trustServerCertificate: true
// },


  pool: {
    max: 5, 
    min: 0, 
    acquire: 30000,
    idle: 10000
  } 
};
  