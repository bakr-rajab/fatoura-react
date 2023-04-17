import axios from "axios";
// const jwt = require("jsonwebtoken");
// import jwt from "jsonwebtoken";
import jwt from 'jwt-decode'

const APP_URL = process.env.REACT_APP_URL + "/api";

const login = (client_id, client_secret, pin) => {

  try {
    console.log("start login");
   
    return axios.post(APP_URL + "/login", { client_id, client_secret, pin }, {
      headers: {
        'Content-Type': 'application/json'
      }, 
      timeout: 5000
    })
      .then(loginRes => {
        if (loginRes.data) {
          // console.log("222222222222222222", loginRes.data);
          const user = jwt(loginRes.data);
          // console.log({ user })
          user.token = loginRes.data
          localStorage.setItem("user", JSON.stringify(user))
        }
        console.log({loginRes});
        return loginRes.data;
      })
  } catch (error) {
  }
};
const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user1 = JSON.parse(localStorage.getItem("user"));
  // console.log("ussser",user);
  let user = ""
  user = {
    pin: 2,
    name: "nananna",
    email: "nananna@gmail.com",
    access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6Ijk2RjNBNjU2OEFEQzY0MzZDNjVBNDg1MUQ5REM0NTlFQTlCM0I1NTQiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJsdk9tVm9yY1pEYkdXa2hSMmR4Rm5xbXp0VlEifQ.eyJuYmYiOjE2Nzk0NjMzODYsImV4cCI6MTY3OTQ2Njk4NiwiaXNzIjoiaHR0cHM6Ly9pZC5ldGEuZ292LmVnIiwiYXVkIjoiSW52b2ljaW5nQVBJIiwiY2xpZW50X2lkIjoiOTljNGRiNGYtZGJkMC00ZjU3LTk3NTUtZjA4N2MyMDI1OTNkIiwiSXNUYXhSZXByZXMiOiIxIiwiSXNJbnRlcm1lZGlhcnkiOiIwIiwiSW50ZXJtZWRJZCI6IjAiLCJJbnRlcm1lZFJJTiI6IiIsIkludGVybWVkRW5mb3JjZWQiOiIyIiwibmFtZSI6IjIwOTc3OTUxOTo5OWM0ZGI0Zi1kYmQwLTRmNTctOTc1NS1mMDg3YzIwMjU5M2QiLCJTU0lkIjoiYTRmZTYyOTktZjA0OC02ODdlLTc4NWItMWQwMTYzNzRmNDJhIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiMCIsIlRheElkIjoiMTczMDkzIiwiVGF4UmluIjoiMjA5Nzc5NTE5IiwiUHJvZklkIjoiMzYxMDAzIiwiSXNUYXhBZG1pbiI6IjAiLCJJc1N5c3RlbSI6IjEiLCJOYXRJZCI6IiIsIlRheFByb2ZUYWdzIjpbIkIyQiIsIkIyQyIsIlNpZ25hdHVyZVJlcXVpcmVkIiwiRGVueVBvcnRhbFN1Ym1pc3Npb24iXSwic2NvcGUiOlsiSW52b2ljaW5nQVBJIl19.IqbhOi4hLvpdGlapD2bug9ACigDFkAC0uW44INXst5ryM1EbNQfTMMBMGcfJo62Q_n26vm3BGQ2S3ct95eO8KtRvBwoiT4Kd5-KP3MspbfXXEGeYSHAYI-yDoUnUWBq8HPrY0DCZ2-hUFdgPxo3Loa-toYAVUjrrBZaBCzYuWVzqoOKyoRho3LeU0_tM8mhrknTabeTF4j2_iwjtM15nwfFmh87lyx8qs7xI0P6E0YJLEu8PlokbHj6CXx5ymW2983addjNT_QlE4oZ_DVAhnnd9l8y-oynob9l_W79m84057Xha3g587wqYFbqpa7LVksblcJCrbFGtSCtXec0JdA",
  }
  return user
};
const AuthService = {
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
