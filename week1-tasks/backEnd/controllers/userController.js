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
    console.log(await res.locals.pictureId);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "other error", message: error.message });
  }
};
exports.getUserDetails = async (req, res) => {};
exports.deleteUserDetails = async (req, res) => {};
