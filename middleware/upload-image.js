// Node js file upload using Multer
const multer = require('multer');
const mkdirp = require('mkdirp');
require('dotenv').config();


var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
const storage = multer.diskStorage({
  
  destination: (req, file, cb) => {
    let path =   process.env.CAR_UPLOAD_PATH;
    mkdirp(path, err =>{
      if(err){
        console.log('err',err);
        cb(err, path)
      }
    });

    cb(null,path)
  },

  filename: (req, file, cb) => {
    cb(null, year + '_' + month + '_' + day + '_' + file.originalname)
  },
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {

      cb(null, true);
     }
  });

  module.exports = upload;



