
const express = require("express");
const app = express();
const router = new express.Router();
app.use(router);
const {uploadSchool,uploadStudent} = require("../helper/image.helper")
const { authenticateJWT} = require("../middleware/auth.middleware");

const {
addSchool,getSchool,addClass,getClass,addStudent,getStudent,assignClass,getAllClassStudent,getClassmates
} = require("../controller/other.controller");

router.post("/addSchool",authenticateJWT,uploadSchool.single('image'), addSchool);
router.post("/getSchool",authenticateJWT, getSchool);
router.post("/addClass",authenticateJWT, addClass);
router.post("/getClass",authenticateJWT, getClass);
router.post("/addStudent",authenticateJWT,uploadStudent.single('image'), addStudent);
router.post("/getStudent",authenticateJWT, getStudent);
router.post("/assignClass",authenticateJWT, assignClass);
router.post("/getAllClassStudent",authenticateJWT, getAllClassStudent);
router.post("/getClassmates",authenticateJWT, getClassmates);












module.exports = router;
