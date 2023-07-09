import React, { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Button from "./sharedComponent/Button";
import FormInput from "./sharedComponent/FormInput";
import User from "../services/userServices";
const userClass = new User();
const UpdateProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state || {};
  // const userData = navigate?.location?.state?.userData || {};
  console.log(userData)
  // const userData = location.state?.userData || null;
  const [formData, setFormData] = useState({
    user_id:userData.user_id,
    userName:userData.userName||'',
    email:userData.email||'',
    mobileNo:userData.mobileNo||'',
    address: userData.address||'',
    picture: userData.picture||'',
  });
  console.log(formData)
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
    const formField = [
      { label: "User Name", type: "text", name: "userName",value:userData.userName},
      { label: "Email", type: "email", name: "email" ,value:userData.email},
      { label: "Mobile No", type: "text", name: "mobileNo",value:userData.mobileNo},
      // { label: "Password", type: "Password", name: "password" ,},
      // { label: "Confirm Password", type: "password", name: "confirmPassword" },
      { label: "Address", type: "text", name: "address" ,value:userData.address},
    ];
    return formField.map((field) => (
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
      let result = await userClass.updateUserServices(formData);
      if (result.status==="success") {
        console.log(result.data)
        toast.success('user updated successfully!', { position: toast.POSITION.BOTTOM_RIGHT });
        const userData={
          user_id:result.data.user_id,
          userName: result.data.userName,
          email: result.data.email,
          mobileNo: result.data.mobileNo,
          address: result.data.address,
          picture:result.data.picture
        }
        navigate('/',{state:{userData}})
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
    <form onSubmit={formSubmitHandler} encType="multipart/form-data" className="centered-form">
      <h1> Update Profile </h1>
      {formFiledRender()}
      {/* <div>
        <label style={{ marginLeft: "0px" }}>Picture:</label>{" "}
        <input type="file" name="picture" onChange={handlePictureFieldChange} />
      </div> */}
      <Button label="Update" type="submit" />
    </form>
  );
};
export default UpdateProfile;
