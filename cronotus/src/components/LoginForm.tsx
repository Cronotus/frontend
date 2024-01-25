import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { loginFetch } from "../services/api/login";
import { TokenDto } from "../interfaces/in/TokenDto";
import CronotusLogoSvg from "/assets/logo/svg/logo-black.svg";
import { Link } from "react-router-dom";

const LoginForm = (props: { className: string; onLogin: () => void }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: (values) => {
      return loginFetch({
        userName: values.userName,
        password: values.password,
      })
        .then((res) => res as unknown as TokenDto)
        .then((tokens) => {
          localStorage.setItem("accessToken", tokens.accessToken);
        })
        .then(() => props.onLogin())
        .catch(() => alert("Login failed!"));
    },
  });

  const submitForm = () => formik.handleSubmit();

  return (
    <div className={props.className}>
      <Box
        sx={{
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexFlow: "column",
          marginBottom: "40%",
        }}
      >
        <img
          id="login-logo"
          src={CronotusLogoSvg}
          alt="Cronotus Logo"
          width="50%"
        />
        <TextField
          id="username-field"
          required
          label="Username"
          variant="outlined"
          value={formik.values.userName}
          onChange={formik.handleChange("userName")}
          onBlur={formik.handleBlur("userName")}
          color="primary"
        />
        <TextField
          id="password-field"
          required
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          id="login-button"
          variant="contained"
          size="large"
          sx={{
            marginTop: "3%",
            backgroundColor: "black",
            "&:hover": { backgroundColor: "#4238DA" },
          }}
          onClick={submitForm}
        >
          Login
        </Button>
        <Link to="/register">
          <Button
            id="register-button"
            variant="text"
            size="medium"
            sx={{
              marginTop: "10%",
              color: "black",
              "&:hover": {
                color: "white",
                backgroundColor: "black",
              },
            }}
          >
            Create a new account
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default LoginForm;
