import React, { useState } from "react";
import logo from "../../../assets/images/logo.svg";
import "../auth.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { register } from "../../../redux/authAction";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Signup({ addUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const onRegister = () => {
    addUser({ name, email, password });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
    setName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="wrapper">
      <div className="header">
        <img src={logo} alt="logo" />
        <span>Wired</span>
      </div>
      <section className="auth">
        <div className="auth--leftcover">
          <div className="icons--decorations mt-auto">
            <div>
              <span>😉</span>
            </div>
            <div>
              <span>🤔</span>
            </div>
            <div>
              <span>😂</span>
            </div>
          </div>
          <div className="slider my-5">
            <span></span>
          </div>
          <div className="content--text mt-auto">
            <h2>
              Implement user <br />
              onboarding experiences <br />
              with just few clicks
            </h2>
            <p>
              Guide your customers on a fantastic <br />
              journey within your web app.
            </p>
          </div>
        </div>
        <div className="auth--rightcover">
          <div className={`success--container   ${success ? "visible" : ""}`}>
            <p>Account created successfully</p>
          </div>
          <div className="mt-auto">
            <h3>Create your account</h3>
            <form onSubmit={handleSubmit(onRegister)} autoComplete="off">
              <div className="form--wrap mt-2">
                <div className="input">
                  <label htmlFor="label">Name</label>
                  <input
                    type="text"
                    placeholder="Type your fullname"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    ref={register}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="input">
                  <label htmlFor="label">Email or phone number</label>
                  <input
                    type="text"
                    placeholder="Type your email or phone number"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    ref={register}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
                <div className="input">
                  <label htmlFor="label">Password</label>
                  <input
                    type="text"
                    placeholder="Type your password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    ref={register}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </div>
              </div>
              <div className="action">
                <button className="btn--primary" type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="mt-auto d-flex justify-content-end pt-4">
            <p>
              Already have an account <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (userInfo) => dispatch(register(userInfo)),
  };
};

export default connect(null, mapDispatchToProps)(Signup);
