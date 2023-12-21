const fs = require('fs');
const multer = require('multer');
const path  =  require('path');



const UserStorage = multer.diskStorage({
    destination: function (Request, file, callback) {
      callback(null, "./uploads/user");
    },
    filename: function (Request, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  // const  upload = multer({ storage: Storgare }).array("image");
  const  uploadUser = multer({ storage: UserStorage });


  
const StudentStorage = multer.diskStorage({
  destination: function (Request, file, callback) {
    callback(null, "./uploads/student");
  },
  filename: function (Request, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const  uploadStudent = multer({ storage: StudentStorage });


const SchoolStorage = multer.diskStorage({
  destination: function (Request, file, callback) {
    callback(null, "./uploads/school");
  },
  filename: function (Request, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const  uploadSchool = multer({ storage: SchoolStorage });

  

module.exports = {
    uploadSchool,uploadUser,uploadStudent
  };