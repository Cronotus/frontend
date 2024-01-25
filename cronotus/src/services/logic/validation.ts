import { object, string } from "yup";
import * as Yup from "yup";

export const registrationSchema = object().shape({
  firstName: string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name should not have special characters"),
  lastName: string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name should not have special characters"),
  userName: string()
    .required("Username is required")
    .min(3, "Username should be at least 3 characters")
    .max(16, "Username should not be more than 16 characters"),
  email: string().required("Email is required").email("Email should be valid"),
  password: string()
    .required("Password is required")
    .min(8, "Passwords should be at least 8 characters"),
  confirmPassword: string()
    .required("Password confirmation is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  phoneNumber: string()
    .required("Phone number is required")
    .matches(/^\+\d{1,4}\d{6,14}$/, "Please provide a valid phone number")
    .min(7, "Please provide a valid phone number")
    .max(15, "Please provide a valid phone number"),
});

export const profileEditSchema = object().shape({
  firstName: string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name should not have special characters"),
  lastName: string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name should not have special characters"),
  userName: string()
    .required("Username is required")
    .min(3, "Username should be at least 3 characters")
    .max(16, "Username should not be more than 16 characters"),
  email: string().required("Email is required").email("Email should be valid"),
  phoneNumber: string()
    .required("Phone number is required")
    .matches(/^\+\d{1,4}\d{6,14}$/, "Please provide a valid phone number")
    .min(7, "Please provide a valid phone number")
    .max(15, "Please provide a valid phone number"),
});
