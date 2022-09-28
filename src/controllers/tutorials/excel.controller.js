const db = require("../../models");
const Tutorial = db.tutorials;
const excelToJson=require('convert-excel-to-json')
const readXlsxFile = require("read-excel-file/node");
const excel = require("exceljs");


var XLSX = require('xlsx');

 


// var workbook = XLSX.readFile('customer.xlsx', {sheetStubs: true});
// var workbook = XLSX.readFile('src/controllers/tutorials/CPSP.xlsx', {sheetStubs: true,header: 1, defval: ''});
var workbook = XLSX.readFile('src/controllers/tutorials/CPSP.xlsx', {header:1, raw:true,sheetStubs: true});

const upload = async (req, res) => {
    

  var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    var data = [];
    for(z in worksheet) {
        if(z[0] === '!') continue;
        //parse out the column, row, and value
        var tt = 0;
        for (var i = 0; i < z.length; i++) {
          // for (var i = 0; i < 13; i++) {
            if (!isNaN(z[i])) {
                tt = i;
                break;
            }
        };
        var col = z.substring(0,tt);
        var row = parseInt(z.substring(tt));
        var value = worksheet[z].v;

        //store header names
        if(row == 1 && value) {
            headers[col] = value;
            continue;
        }
if(headers[col]=='Name (as in Passport)'){
  headers[col]='name'
}
else if(headers[col]=='Email Adress'){
  headers[col]= "email"
}
else if(headers[col]=="Gender"){
  headers[col]= "gender"
}
else if(headers[col]=='Do you have a Transcript from CPSP'){
  headers[col]= "transScript"
}
else if(headers[col]=='QUALIFICAION'){
  headers[col]= "qualification"
}
else if(headers[col]=='YEAR of Entry in KSA'){
  headers[col]= "yearOfEntry"
}
else if(headers[col]=='What was the response of SCFHS about your Application for "RE-CLASSIFICATION'){
  headers[col]= "SCFHSresponse"
}
else if(headers[col]=='How much period of Residency was done in Saudi Arabia?'){
  headers[col]= "residencyDuration"
}
else if(headers[col]=='WORKING PLACE ( Hospital Name with City)'){
  headers[col]= "HosNameCity"
}
else if(headers[col]=='Mobile Number'){
  headers[col]= "mobile"
}
else if(headers[col]=='POST in SCFHS'){
  headers[col]= "SCFHSpost"
}
else if(headers[col]=='POST IN HOSPITAL '){
  headers[col]= "hospitalPost"
}
else if(headers[col]=='What was the response of SCFHS about your Application for "RE-CLASSIFICATION"'){
  headers[col]= "SCFHSresponse"
}
else if(headers[col]== 'SPECIALITY'){
  headers[col]='speciality'
} 
else if(headers[col]=='null'){
  headers[col]=null
}
else if(headers[col]=='YEARS OF ALL POST GRADUATION DEGREES [Row 2]' || headers[col]=='YEARS OF ALL POST GRADUATION DEGREES [Row 2]'
|| headers[col]=='YEARS OF ALL POST GRADUATION DEGREES [Row 3]' || headers[col]=='YEARS OF ALL POST GRADUATION DEGREES [FRCS]' ||
headers[col]=='YEARS OF ALL POST GRADUATION DEGREES [FRCOG]' || headers[col]=='YEARS OF ALL POST GRADUATION DEGREES [European Diploma]' ||
headers[col]=='YEARS OF ALL POST GRADUATION DEGREES [FCPS, Part -1. .Only]' || headers[col]=='YEARS OF ALL POST GRADUATION DEGREES [Row 11]' ||
headers[col]=='YEAR OF CPS Part 1' || headers[col]=='Email Address'|| headers[col]== 'YEARS OF FCPS part-1' || headers[col]== 'Others-' ||
headers[col]==  'WORKING PLACE (City/ Region)'||  headers[col]== 'How much Period of Residency was done in Saudi Arabia? ' || 
headers[col]== 'FCPS' || headers[col]=='YEARS OF ALL POST GRADUATION DEGREES [MRCOG]'  || headers[col]=='Timestamp' 
){
  headers[col]=null
}
// else if (headers[col]=="Timestamp"){
//   headers[col]=''
// }
// else if (headers[col]==null && value ==''){
//   headers[col]=null
//  console.log("first")
// }

// else if(headers[col]== 'undefined'){
//   headers[col]=null
// } 


else if(value ==undefined){
 value=''
  
}






        if(!data[row]) data[row]={};
        data[row][headers[col]] = value;
        if (headers[col] == undefined || data[row]==undefined ) {
          headers[col]=''
          data[row][headers[col]] = value;

          
      }


      if(headers[col]=='' && value =='' ){
        headers[col]==null
      }
    }
    //drop those first two rows which are empty
  
   
    // data.shift();
    // data.shift();
    console.log(data);
});
    







  // try {
  //   if (req.file == undefined) {
  //     return res.status(400).send("Please upload an excel file!");
  //   }

  //   let path =
  //     __basedir + "/resources/static/assets/uploads/" + req.file.filename;


     
    
  //   readXlsxFile(path).then((rows) => {
  //     rows.shift();

  //     let tutorials = [];

  //     rows.forEach((row) => {
  //       let tutorial = {
  //         id: row[0],
  //         data: row[1],
  //         email: row[2],
         
  //       };
  
      

       
  //       tutorials.push(tutorial)
  //     });

  //     Tutorial.bulkCreate(tutorials)
  //       .then(() => {
  //         res.status(200).send({
  //           message: "Uploaded the file successfully: " + req.file.originalname,
  //         });
  //       })
  //       .catch((error) => {
  //         res.status(500).send({ 
  //           message: "Fail to import data into database!",
  //           error: error.message,
  //         });
  //       });
  //   });
  // } catch (error) {
  //   console.log("error jsao "); 
  //   res.status(500).send({
  //     message: "Could not upload the file: " + req.file.originalname,
  //   });
  // }
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
