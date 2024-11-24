import React, { useState } from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image512 from "../assets/logo512.png";
import image192 from "../assets/logo192.png";
import { SHA256 } from "crypto-js";
import see from "../assets/see.png";
import hide from "../assets/hide.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function computeHash(input) {
    return SHA256(input).toString();
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    // Extract values from the form
    let name = e.target.name.value;
    let email = e.target.email.value;
    let type = e.target.type.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;
    let pno = e.target.pno.value;
    let dob = e.target.dob.value;

    if (password.length > 0 && confirmPassword.length > 0) {
      if (password === confirmPassword) {
        password = computeHash(password); // Hash the password
        password = computeHash(email + password); // Add email to ensure uniqueness

        const formData = {
          name,
          email,
          password,
          type,
          pno,
          dob,
        };

        try {
          // Make POST request to backend
          await axios.post("http://localhost:5000/users/signup", formData);
          navigate("/login"); // Redirect to login on success
        } catch (err) {
          console.error(err);
          alert("Error creating account. Please try again.");
        }
      } else {
        alert("Passwords do not match.");
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="register-main">
      <div className="register-left">
        <img alt="Full" src={image512} />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img alt="logo" src={image192} />
          </div>
          <div className="register-center">
            <h2>Welcome to our website!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <div className="first-slide">
                <select name="type" id="type" required>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  required={true}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required={true}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="pno"
                  required={true}
                />
                <input type="date" name="dob" id="dob" required />
                <div className="pass-input-div">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    required={true}
                  />
                  {showPassword ? (
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(false);
                      }}
                      style={{ color: "white", padding: 0 }}
                    >
                      <img className="hide" src={hide} alt="hide" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(true);
                      }}
                      style={{ color: "white", padding: 0 }}
                    >
                      <img className="see" src={see} alt="see" />
                    </button>
                  )}
                </div>
                <div className="pass-input-div">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    required={true}
                  />
                  {showPassword ? (
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(false);
                      }}
                      style={{ color: "white", padding: 0 }}
                    >
                      <img className="hide" src={hide} alt="hide" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(true);
                      }}
                      style={{ color: "white", padding: 0 }}
                    >
                      <img className="see" src={see} alt="see" />
                    </button>
                  )}
                </div>
                <div className="register-center-buttons">
                  <button type="submit">Sign Up</button>
                </div>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "black" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
