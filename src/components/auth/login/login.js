import React, { useState } from "react";
import logo from "../../../assets/images/logo.svg";
import "../auth.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { login } from "../../../redux/authAction";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Login({ loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string().required("Password is required"),
  });

  // functions to build form returned by useForm() hook
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onLogin = () => {
    loginUser({ email, password });
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
            <h2>Easy to use Dashboard</h2>
            <p>
              Let's see what we have new, check it out!
              <br />
              so maybe write here something more hee.
            </p>
          </div>
        </div>
        <div className="auth--rightcover">
          <div className="mt-auto">
            <p>
              <span>👋</span>
            </p>
            <h3>Welcome Back</h3>
            <p>Let's build something great</p>
            <form onSubmit={handleSubmit(onLogin)} autoComplete="off">
              <div className="form--wrap mt-5">
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
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="mt-auto d-flex justify-content-end pt-4">
            <p>
              Don't have an account <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userInfo) => dispatch(login(userInfo)),
  };
};

export default connect(null, mapDispatchToProps)(Login);
