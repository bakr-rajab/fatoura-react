import { redirect } from "react-router-dom";

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
        console.log("no user found...");
        redirect("/login");
      return {};
    }
  }
  