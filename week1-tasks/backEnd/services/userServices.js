const { Op, Sequelize, QueryTypes } = require("sequelize");
const db = require("../model");
const bcrypt = require("bcrypt");
exports.createUserServices = async (bodyData, bcryptPassword, public_id) => {
  try {
    const createUser = await db.user.create({
      userName: bodyData.userName,
      email: bodyData.email,
      mobileNo: bodyData.mobileNo,
      password: bcryptPassword,
      address: bodyData.address,
      pictureId: public_id,
      created_by: bodyData.email,
      updated_by: bodyData.email,
    });
    return {
      success: true,
      data: {
        user_id: createUser.user_id,
        userName: bodyData.userName,
        email: bodyData.email,
        mobileNo: bodyData.mobileNo,
        address: bodyData.address,
        pictureId: public_id,
      },
    };
  } catch (e) {
    throw Error(e);
  }
};

exports.updateProfileServices = async (bodyData) => {
  try {
    const updateProfileDetails = {
      userName: bodyData.userName,
      mobileNo: bodyData.mobileNo,
      email: bodyData.email,
      // picture: imageId,
      address: bodyData.address,
      updated_by: bodyData.email,
    };
    const result = await db.user.update(updateProfileDetails, {
      where: { user_id: bodyData.user_id },
    });
    console.log(result)
    return {
      success: true,
      data: {
        user_id: bodyData.user_id,
        userName: bodyData.userName,
        email: bodyData.email,
        mobileNo: bodyData.mobileNo,
        address: bodyData.address,
        picture:bodyData.picture
      },
      message: "profile updated successfully ",
    };
  } catch (error) {
    throw Error(error);
  }
};

exports.checkUserExistServices = async (userData) => {
  try {
    console.log(userData);
    const user = await db.user.findOne({
      where: Sequelize.or(
        { email: userData.emailOrMobile },
        { mobileNo: userData.emailOrMobile }
      ),
    });
    if (user) {
      console.log(user.password);
      const checkPassword = bcrypt.compareSync(
        userData.password,
        user.password
      );
      console.log(checkPassword);
      if (checkPassword) {
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

exports.deleteUserDetailsServices = async () => {};
