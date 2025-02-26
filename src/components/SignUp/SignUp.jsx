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
    console.log(email);
    console.log(password);

    setErrorMessage("");
    setSuccess(false);

    if (password.length < 6) {
      setErrorMessage("Passord should be 6 characters or longer");
      return;
    }

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
    <div className="card bg-base-100   mx-auto w-full max-w-sm shrink-0 shadow-2xl">
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
        <div className="form-control mt-6">
          <button className="btn btn-primary">SignUp</button>
        </div>
      </form>
      {errorMessage && (
        <p className="text-red-600 text-center">{errorMessage}</p>
      )}

      {success && <p className=" text-green-600"> SinUp successful</p>}
    </div>
  );
};

export default SignUp;
