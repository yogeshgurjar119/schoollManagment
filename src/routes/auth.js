
const express = require("express");
const app = express();
const router = new express.Router();
app.use(router);
const {uploadSchool,uploadUser} = require("../helper/image.helper")
const { authenticateJWT} = require("../middleware/auth.middleware");

const {
registation,login
} = require("../controller/auth.controller");

router.post("/register",uploadUser.single('image'), registation);
router.post("/login", login);




module.exports = router;
