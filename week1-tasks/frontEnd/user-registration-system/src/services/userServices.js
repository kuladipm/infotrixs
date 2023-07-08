class User {
  async createUserServices(userData) {
    //   console.log(JSON.stringify(userData));
    try {
      const formData = new FormData();
      formData.append("userName", userData.userName);
      formData.append("email", userData.email);
      formData.append("mobileNo", userData.mobileNo);
      formData.append("password", userData.password);
      formData.append("address", userData.address);
      formData.append("picture", userData.picture);
      console.log(formData);
      const res = await fetch(`http://localhost:5000/api/user`, {
        method: "Post",
        body: formData,
      });
      const result = await res.json();
      return await result;
    } catch (error) {
      console.log(error);
      return await error;
    }
  }

  async logInUserServices(loginData) {
    try {
      const res = await fetch(`http://localhost:5000/api/login`, {
        method: "Post",
        headers: {
          "content-type": "application/json",
          // "x-access-token": sessionStorage.getItem("authorization"),
        },
        body: JSON.stringify(loginData),
      });
      const result = await res.json();
      return await result;
    } catch (error) {
      console.log(error);
      return await error;
    }
  }
}

export default User;
