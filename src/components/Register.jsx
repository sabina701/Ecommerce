import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../css/Register.css";
const Register = ({ show }) => {
  const modelRef = useRef(null);
  useEffect(() => {
    function handleModel(event) {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        show(false);
      }
    }
    document.addEventListener("mousedown", handleModel);
    return () => document.removeEventListener("mousedown", handleModel);
  }, []);
  const Schema = yup.object({
    firstName: yup
      .string()
      .min(3, "Minimum 3 Characters.")
      .required("This field cannot be empty."),
    lastName: yup
      .string()
      .min(3, "Minimum 3 characters.")
      .required("This field cannot be empty."),
    email: yup
      .string()
      .email("Email does not match")
      .required("This field cannot be empty."),
    password: yup
      .string()
      .min(8, "Minimum 8 characters")
      .matches(/[A-Z]/, "Must contain an uppercase letter")
      .matches(/[a-z]/, "Must contain a lowercase letter")
      .matches(/\d/, "Must contain a number")
      .matches(/[!@#$%^&()*]/, "Must contai a special character")
      .required("This field cannot be empty"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("ConfirmPassword required"),
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(Schema) });
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="parent-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="child-container"
        ref={modelRef}
      >
        <span className="text-black" onClick={() => show(false)}>
          X
        </span>
        <div className="field">
          <label htmlFor="firstName">First Name</label>
          <input
            placeholder="John"
            {...register("firstName")}
            className="form-control"
          />
          <span className="errorMessage">{errors.firstName?.message}</span>
        </div>
        <div className="field">
          <label htmlFor="lastName">Last Name</label>
          <input
            placeholder="Carter"
            {...register("lastName")}
            className="form-control"
          />
          <span className="errorMessage">{errors.lastName?.message}</span>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            placeholder="john@gmail.com"
            {...register("email")}
            className="form-control w-100"
          />
          <span className="errorMessage">{errors.email?.message}</span>
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            {...register("password")}
            className="form-control"
          />
          <span className="errorMessage">{errors.password?.message}</span>
        </div>

        <div className="field ">
          <label htmlFor="confirmPassword" className="mt-3">
            Confirm Password
          </label>
          <input
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="form-control"
          />
          <span className="errorMessage">
            {errors.confirmPassword?.message}
          </span>
        </div>
        <button type="submit" className="mt-1 btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
