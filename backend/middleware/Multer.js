const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});
module.exports = upload;
