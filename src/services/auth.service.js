import axios from "axios";

const APP_URL =process.env.REACT_APP_URL+"/api";

const login = (client_id, client_secret,pin) => {

    try {
        return axios.post(APP_URL+"/login",{client_id,client_secret,pin})
        .then(loginRes => {
            console.log({loginRes});
            if (loginRes.data.accessToken){
             localStorage.setItem("user", loginRes.data)   
            }
            return loginRes.data;
        })
    } catch (error) {
        console.log("login error: " , error);
    }
};
const logout = () => {
    localStorage.removeItem("user");
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  const AuthService = {
    login,
    logout,
    getCurrentUser,
  };
  
  export default AuthService;
  