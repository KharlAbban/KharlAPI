const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/uploads/");
//     },
//     filename: function (req, file, cb) {
//       let extArray = file.mimetype.split("/");
//       let extension = extArray[extArray.length - 1];
//       cb(null, file.fieldname + '-' + Date.now()+ '.' +extension);
//     }
// });

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;