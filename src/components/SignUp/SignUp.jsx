import React, { useState } from "react";
import { auth } from "../../Firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    setErrorMessage("");
    setSuccess(false);

    if (!terms) {
      setErrorMessage("Please accept our Terms and Conditions");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters long");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setSuccess(true);

        // ✅ সঠিকভাবে ইমেল ভেরিফিকেশন পাঠানো
        sendEmailVerification(user)
          .then(() => {
            alert("Verification email sent! Please check your inbox.");
          })
          .catch((error) => {
            console.error("Email verification error:", error);
          });
      })
      .catch((error) => {
        console.log("Error:", error);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-5xl ml-4 font-bold">SignUp</h1>
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
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-xs absolute right-5 top-12"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <label className="label justify-start cursor-pointer">
          <input type="checkbox" name="terms" className="checkbox" />
          <span className="label-text ml-2">
            Accept Our Terms and Conditions
          </span>
        </label>

        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>

      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}

      {success && (
        <p className="text-green-600 text-center">
          Sign Up successful! Please check your email for verification.
        </p>
      )}
      <p className="m-3">
        Already have an Account? Please
        <Link to="/LogIn" className="relative ml-1">
          <span className="text-green-500 after:block after:h-[2px] after:bg-green-500 after:w-full after:absolute after:left-0 after:bottom-0">
            LogIn
          </span>
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
