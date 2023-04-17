import { redirect, useNavigate } from "react-router-dom";

export default function authHeader() {
  // let navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log({user})
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
      return { 'x-access-token': user.accessToken };
    } else {
      // navigate("/login");
        console.log("no user found...");
        redirect("/login");
      return {};
    }
  }
  