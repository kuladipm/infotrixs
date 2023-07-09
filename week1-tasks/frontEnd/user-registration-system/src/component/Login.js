import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import FormInput from "./sharedComponent/FormInput";
import Button from "./sharedComponent/Button";
import User from "../services/userServices";
const userClass = new User();
const Login = () => {
  const navigate = useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const handleChangeEmailOrMobile = (e) => {
    setEmailOrMobile(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const formSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(emailOrMobile);
      const userData = { emailOrMobile: emailOrMobile, password: password };
      let result = await userClass.logInUserServices(userData);
      if (result.status === "success") {
        toast.success("logged In successfully!", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        const userData = {
          user_id: result.data.user_id,
          userName: result.data.userName,
          email: result.data.email,
          mobileNo: result.data.mobileNo,
          address: result.data.address,
          picture: result.data.pictureId,
        };

        navigate("/", { state: { userData } });
      } else {
        const errorMessage = result.errors
          ? Object.values(result.errors)[0]
          : `${result.message}`;

        toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT });
        console.log(result.errors);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={formSubmitHandler} className="centered-form">
      <h1>Login/SignUp</h1>
      <FormInput
        label="Email Or Mobile"
        name="emailOrMobile"
        type="text"
        value={emailOrMobile}
        onChange={handleChangeEmailOrMobile}
      />
      <FormInput
        label="Password"
        name="password"
        type="password"
        value={password}
        onChange={handleChangePassword}
      />
      <Button label="Login" type="submit" />
    </form>
  );
};

export default Login;
