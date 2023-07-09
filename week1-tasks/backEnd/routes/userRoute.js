const express = require("express");
const {registrationValidations,loginValiadations,updateValidations}=require('../middleware/validations')
const {databseErrorHandler}=require('../middleware/databaseErrorHandler')
const {
  createUser,
  loginUser,
  updateProfile,
  deleteUserDetails,
} = require("../controllers/userController");
const router = express.Router();
const multer=require('multer')
const upload = multer({ dest: 'uploads/' });
 router.post("/login",loginValiadations,loginUser,databseErrorHandler);
router.post("/user",upload.single('picture'),registrationValidations,createUser,databseErrorHandler);
router.patch("/user",upload.single('picture'),updateValidations,updateProfile,databseErrorHandler);
router.delete("/user", deleteUserDetails);
//profile picture
// router.post("/upload-picture", uploadProfilePicture);
// router.get("/get-picture", getProfilePictureUrl);
module.exports = router;
