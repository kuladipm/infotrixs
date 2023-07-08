const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config();
let publicId;
// Configure Cloudinary
cloudinary.config({
  cloud_name:"dihtuebcy",
  api_key:215346914555643,
  api_secret:'Ii0qofjsBRlcGFSH-gxKge-gvDM'
});

// Function to upload profile picture to Cloudinary
const uploadProfilePicture = async(file) => {
try {
    const result=await cloudinary.uploader.upload(file)
    return result.secure_url
    // console.log(public_id)
    // res.locals.public_id =public_id;
    // next()
} catch (error) {
    throw error(error)
}
  
};

// Function to get profile picture URL from Cloudinary
const getProfilePictureUrl = (publicId) => {
  return cloudinary.url(publicId, { secure: true });
};

module.exports = {
  uploadProfilePicture,
  getProfilePictureUrl
};
