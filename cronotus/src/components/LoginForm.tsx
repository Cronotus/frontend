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

const LoginForm = (props: { className: string }) => {
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
          localStorage.setItem("refreshToken", tokens.refreshToken);
          alert("Login was successful!");
        })
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
          marginBottom: "49%",
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
          sx={{ marginTop: "3%", backgroundColor: "black" }}
          onClick={submitForm}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default LoginForm;
