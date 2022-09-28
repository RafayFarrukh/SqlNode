const db = require("../../models");
const Tutorial = db.tutorials;
const excelToJson=require('convert-excel-to-json')
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");
var xlsx = require('exceljs');


function convertToJSON(array) {
  var first = array[0].join()
  var headers = first.split(',');

  var jsonData = [];
  for ( var i = 1, length = array.length; i < length; i++ )
  {

    var myRow = array[i].join();
    var row = myRow.split(',');

    var data = {};
    for ( var x = 0; x < row.length; x++ )
    {
      data[headers[x]] = row[x];
    }
    jsonData.push(data);

  }
  return jsonData;
};
readXlsxFile('./src/controllers/tutorials/rafay.xlsx', function(err,data) {
  if(err) throw err;
  //console.log(jsonDataArray(data));
  console.log(JSON.stringify(convertToJSON(data)));
  //console.log(data);
});



const upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      __basedir + "/resources/static/assets/uploads/" + req.file.filename;


     
    
    // readXlsxFile(path).then((rows) => {
    //   rows.shift();

    //   let tutorials = [];

    //   rows.forEach((row) => {
    //     let tutorial = {
    //       id: row[0],
    //       data: row[1],
    //       email: row[2],
         
    //     };
  
      

       
    //     tutorials.push(tutorial)
    //   });

    //   Tutorial.bulkCreate(tutorials)
    //     .then(() => {
    //       res.status(200).send({
    //         message: "Uploaded the file successfully: " + req.file.originalname,
    //       });
    //     })
    //     .catch((error) => {
    //       res.status(500).send({ 
    //         message: "Fail to import data into database!",
    //         error: error.message,
    //       });
    //     });
    // });
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
