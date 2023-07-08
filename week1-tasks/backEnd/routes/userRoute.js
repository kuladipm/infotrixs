const express = require("express");
const {registrationValidations,loginValiadations}=require('../middleware/validations')
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
 router.post("/login",loginUser,databseErrorHandler);
// router.get("/user", getUserDetails);
router.post("/user",upload.single('picture'),registrationValidations,createUser,databseErrorHandler);
router.delete("/user", deleteUserDetails);
//profile picture
// router.post("/upload-picture", uploadProfilePicture);
// router.get("/get-picture", getProfilePictureUrl);
module.exports = router;
