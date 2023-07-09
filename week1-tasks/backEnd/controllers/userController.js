const express = require("express");
const bcrypt = require("bcrypt");
const { uploadProfilePicture } = require("./profilePictureController");
const {
  loginUserByMobileNoServices,
  loginUserByEmailServices,
  createUserServices,
  checkUserExistServices,
  getUserDetailsServices,
  updateProfileServices,
  deleteUserDetailsServices,
} = require("../services/userServices");
const saltRounds = 10;
exports.loginUser = async (req, res, next) => {
  try {
    // let bcryptPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const result = await checkUserExistServices(req.body);
    if (!result) {
      res.status(401).send({
        status: "fails",
        message: "user not found",
        data: {},
      });
    } else {
      res.status(200).send({
        status: "success",
        message: "login successfully",
        data: {
          user_id:result.user_id,
          email: result.email,
          userName: result.userName,
          mobileNo: result.mobileNo,
          address: result.address,
          pictureId: result.pictureId,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const pictureId = await uploadProfilePicture(req.file.path);
    console.log(pictureId);
    let bcryptPassword = bcrypt.hashSync(req.body.password, saltRounds);
    const result = await createUserServices(
      req.body,
      bcryptPassword,
      pictureId
    );
    return res.status(201).json({
      status: "success",
      message: "user created successfully",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateProfile = async (req, res, next) => {
  try {
    const result = await updateProfileServices(
      req.body,
    );
    console.log(result.data)
    return res.status(200).json({
      status: "success",
      message: "user updated successfully",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
exports.getUserDetails = async (req, res) => {};
exports.deleteUserDetails = async (req, res) => {};
