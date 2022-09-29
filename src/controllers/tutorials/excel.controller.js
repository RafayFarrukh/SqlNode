const db = require("../../models");
const Tutorial = db.tutorials;
const excelToJson=require('convert-excel-to-json')
const readXlsxFile = require("read-excel-file/node");
// const excel = require("exceljs");

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
        let tutorial = {
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
  
      

       
        tutorials.push(tutorial)
        console.log(tutorials);
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
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log("error jsao "); 
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
      });
    });
};

const download = (req, res) => {
  Tutorial.findAll().then((objs) => {
    let tutorials = [];

    objs.forEach((obj) => {
      tutorials.push({
        id: obj.id,
        title: obj.title,
        description: obj.description,
        published: obj.published,
      });
    });

    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Tutorials");

    worksheet.columns = [
      { header: "Id", key: "id", width: 5 },
      { header: "data", key: "data", width: 25 },
      // { header: "email", key: "email", width: 25 },
      // { header: "password", key: "password", width: 10 },
      // { header: "status", key: "status", width: 10 },
      // { header: "role", key: "role", width: 10 },
    ];

    // Add Array Rows
    worksheet.addRows(tutorials);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + "tutorials.xlsx"
    );

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  });
};

module.exports = {
  upload,
  getTutorials,
  download,
};
