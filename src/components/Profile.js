import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.pin}</strong>
           Profile
        </h3>
      </header>
      <p>
        {/* <strong>Token:</strong> {currentUser.access_token.substring(0, 20)} ...{" "} */}
        {/* {currentUser.access_token.substr(currentUser.access_token.length - 20)} */}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.pin}
      </p>
      <p>
        {/* <strong>Email:</strong> {currentUser.email} */}
      </p>
      {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;
