import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "../css/Register.css";
import API from "../api/axios";
import { toast } from "react-toastify";

const Register = ({ show }) => {
  const modelRef = useRef(null);

  useEffect(() => {
    function handleModel(event) {
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        show(false);
      }
    }

    document.addEventListener("mousedown", handleModel);

    return () => {
      document.removeEventListener("mousedown", handleModel);
    };
  }, [show]);

  // Validation Schema
  const Schema = yup.object({
    username: yup
      .string()
      .min(3, "Minimum 3 Characters.")
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
      .matches(/[!@#$%^&()*]/, "Must contain a special character")
      .required("This field cannot be empty."),

    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Schema),
  });

  // Runs only after validation passes
  async function onSubmit(data) {
    try {
      const result = await API.post("/signup", data);

      console.log(result.data);
      toast.success(result.data.message);

      show(false);
    } catch (err) {
      console.log(err);

      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <div className="parent-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="child-container"
        ref={modelRef}
      >
        <span
          className="text-black"
          style={{ cursor: "pointer" }}
          onClick={() => show(false)}
        >
          X
        </span>

        {/* Username */}
        <div className="field">
          <label>Username</label>
          <input
            type="text"
            placeholder="John"
            {...register("username")}
            className="form-control"
          />
          <span className="errorMessage">{errors.username?.message}</span>
        </div>

        {/* Email */}
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="john@gmail.com"
            {...register("email")}
            className="form-control"
          />
          <span className="errorMessage">{errors.email?.message}</span>
        </div>

        {/* Password */}
        <div className="field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="form-control"
          />
          <span className="errorMessage">{errors.password?.message}</span>
        </div>

        {/* Confirm Password */}
        <div className="field">
          <label className="mt-3">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="form-control"
          />
          <span className="errorMessage">
            {errors.confirmPassword?.message}
          </span>
        </div>

        <button type="submit" className="btn btn-primary mt-3 w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
