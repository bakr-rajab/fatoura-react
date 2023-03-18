import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [clientId, setClientId] = useState("");
  const [pin, setPin] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeClientId = (e) => {
    const clientId = e.target.value;
    setClientId(clientId);
  };
  const onChangePin = (e) => {
    const pin = e.target.value;
    setPin(pin);
  };
  const onChangeClientSecret = (e) => {
    const clientSecret = e.target.value;
    setClientSecret(clientSecret);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();
    console.log({clientId,clientSecret,pin});
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(clientId, clientSecret,pin).then(
        () => {
          navigate("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="clientId">ClientId</label>
            <Input
              type="text"
              className="form-control"
              name="clientId"
              value={clientId}
              onChange={onChangeClientId}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clientSecret">ClientSecret</label>
            <Input
              type="text"
              className="form-control"
              name="clientSecret"
              value={clientSecret}
              onChange={onChangeClientSecret}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="clientId">User Pin</label>
            <Input
              type="text"
              className="form-control"
              name="pin"
              value={pin}
              onChange={onChangePin}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
