const db = require("../../models");
const Tutorial = db.tutorials;
const excelToJson=require('convert-excel-to-json')
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");

var path = require('path');
var Excel = require('exceljs');







const upload = async (req, res) => {
 



  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;


     
    
    readXlsxFile(path).then((rows) => {
      rows.shift();

      let tutorials = [];
    
   
      rows.forEach((row) => {
        let data1 = {
          name: row[1],
          email: row[11],
          mobile: row[12],
          hospitalPost: row[9],
          mobile: row[12],
          residencyDuration: row[15],
          workingPlace: row[8],
          SCFHSpost: row[10],
          gender: row[2],
          speciality: row[3],
          qualification: row[4],
          yearOfEntry: row[7],
          transScript: row[16],       
          SCFHSresponse: row[17],
          yoapgd: row[21],
          HosNameCity: row[13],
        };
        // data1=JSON.stringify(data1)
        // console.log(data1);
        let tutorial={
          data:JSON.stringify(data1),
          // data:"hhh",
          email:row[11],
          password:"hhhhhhhhhhhhhhhh",
          status:1,
          role:1,
          approvedAt: 2022-09-30 ,
          approvedBy:"hii",
          // createdAt:2022-09-30
         
        }
        
  
      
 
       
        tutorials.push(tutorial)
        // console.log(JSON.stringify(tutorial));
        console.log((tutorial));
        // console.log(JSON.stringify(data1));
      }); 

      

      Tutorial.bulkCreate(tutorials)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({ 
            message: "Fail to import data into database!",                                                                                                                                                                             
            error: error
            // error: error.name,
            
          });
        });
    });
  } catch (error) {
    console.log("error HAI "); 
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};


const getTutorials = (req, res) => {
  Tutorial.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
          err,
      });
    }); 
};

const download = (req, res) => {
  // Tutorial.findAll().then((objs) => { 
  //   let tutorials = [];

  //   objs.forEach((obj) => {
  //     tutorials.push({
  //       id: obj.id,
  //       // name: obj.name,
  //       data: obj.data,
  //       // mobile: obj.mobile,
  //     });
  //   });

  //   let workbook = new excel.Workbook();
  //   let worksheet = workbook.addWorksheet("Tutorials");

  //   worksheet.columns = [
  //     { header: "id", key: "id", width: 5 },
  //     { header: "data", key: "data", width: 25 },
  //     { header: "email", key: "email", width: 25 },
  //     { header: "password", key: "password", width: 10 },
  //     { header: "status", key: "status", width: 10 },
  //     { header: "ROLE", key: "ROLE", width: 10 },
  //   ];

  //   // Add Array Rows
  //   worksheet.addRows(tutorials);
  //   res.setHeader(
  //     "Content-Type",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   );
  //   res.setHeader(
  //     "Content-Disposition",
  //     "attachment; filename=" + "tutorials.xlsx"
  //   );

  //   return workbook.xlsx.write(res).then(function () {
  //     res.status(200).end();
  //   });
  // });
};

module.exports = {
  upload,
  getTutorials,
  download,
};
