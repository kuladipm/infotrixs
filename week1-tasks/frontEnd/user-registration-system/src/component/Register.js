import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Button from "./sharedComponent/Button";
import FormInput from "./sharedComponent/FormInput";
import User from "../services/userServices";
const userClass = new User();
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    mobileNo: "",
    Password: "",
    confirmPassword: "",
    address: "",
    picture: null,
  });
  const handleInputFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handlePictureFieldChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      picture: file,
    }));
  };

  const formFiledRender = () => {
    const formData = [
      { label: "User Name", type: "text", name: "userName" },
      { label: "Email", type: "email", name: "email" },
      { label: "Mobile No", type: "text", name: "mobileNo" },
      { label: "Password", type: "Password", name: "password" },
      { label: "Confirm Password", type: "password", name: "confirmPassword" },
      { label: "Address", type: "text", name: "address" },
    ];
    return formData.map((field) => (
      <FormInput
        key={field.name}
        label={field.label}
        type={field.type}
        name={field.name}
        value={formData[field.name]}
        onChange={handleInputFieldChange}
      />
    ));
  };

  const formSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      let result = await userClass.createUserServices(formData);
      if (result.status==="success") {
        console.log(result.data)
        toast.success('user registered successfully!', { position: toast.POSITION.BOTTOM_RIGHT });
        const userData={
          userName: result.data.userName,
          email: result.data.email,
          mobileNo: result.data.mobileNo,
          address: result.data.address,
          picture:result.data.pictureId
        }
        navigate('/',{state:{userData}})
      } else {
        toast.error(`${Object.values(result.errors)[0]}`, { position: toast.POSITION.BOTTOM_RIGHT });
        console.log(result.errors)
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={formSubmitHandler} encType="multipart/form-data" className="centered-form">
      <h1> Registration </h1>
      {formFiledRender()}
      <div>
        <label style={{ marginLeft: "0px" }}>Picture:</label>{" "}
        <input type="file" name="picture" onChange={handlePictureFieldChange} />
      </div>
      <Button label="Login" type="submit"/>
    </form>
  );
};
export default Register;
