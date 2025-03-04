import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Email:", email);
    console.log("Password:", password);

    setErrorMessage("");
    setSuccess(false);

    const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordValid.test(password)) {
      setErrorMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      );
      return;
    }

    // Password length validation
     if (password.length < 6) {
      setErrorMessage("Password should be 6 characters or longer");
      return;
    } 

    // Regex to validate password
    //const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    // Check if password meets the regex condition
    if (!passwordValid.test(password)) {
      setErrorMessage(
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
      );
      return;
    }  

    // Firebase create user logic
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
      })
      .catch((error) => {
        console.log("Error", error);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl p-6">
      <h1 className="text-5xl ml-4 font-bold">Sign Up</h1>

      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-1">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>

      {/* Success Message */}
      {success && (
        <p className="text-green-600 text-right font-semibold pr-4">
          Sign Up successful!
        </p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}
    </div>
  );
};

export default SignUp;
