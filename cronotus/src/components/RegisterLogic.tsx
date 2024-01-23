import { useEffect, useState } from "react";
import RegistrationSequenceBlock from "./RegistrationSequenceBlock";
import "../styles/register.css";
import { Box, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useFormik } from "formik";
import { registrationSchema } from "../services/logic/validation";
import { registerFetch } from "../services/api/register";
import { useNavigate } from "react-router-dom";

const RegisterLogic = () => {
  const [registrationSequence, setRegistrationSequence] = useState<number>(0);
  const [sendData, setSendData] = useState<boolean>(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      return registerFetch({
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        password: values.password,
        phoneNumber: values.phoneNumber,
      })
        .then(() => {
          console.log("Registration was successful!");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        })
        .catch(() => {
          navigate("/");
          console.log("Registration failed!");
        });
    },
  });

  useEffect(() => {
    if (sendData) {
      formik.handleSubmit();
    }
  }, [sendData]);

  switch (registrationSequence) {
    case 0: {
      const realNamesSchema = registrationSchema.pick([
        "firstName",
        "lastName",
      ]);

      const { firstName, lastName } = formik.values;
      const valuesToUse = { firstName, lastName };

      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="What's your real name?"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          validationSchema={realNamesSchema}
          formValues={valuesToUse}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <TextField
                id="registration-sequence-firstname-field"
                required
                name="firstName"
                label="First name"
                variant="outlined"
                color="primary"
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                id="registration-sequence-lastname-field"
                required
                name="lastName"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last name"
                variant="outlined"
                color="primary"
              />
            </Box>
          }
        />
      );
    }

    case 1: {
      const userNameSchema = registrationSchema.pick(["userName"]);
      const { userName } = formik.values;
      const valuesToUse = { userName };

      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="How should we call you?"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          validationSchema={userNameSchema}
          formValues={valuesToUse}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <TextField
                id="registration-sequence-username-field"
                required
                name="userName"
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.userName && Boolean(formik.errors.userName)
                }
                helperText={formik.touched.userName && formik.errors.userName}
                label="Username"
                variant="outlined"
                color="primary"
              />
            </Box>
          }
        />
      );
    }

    case 2: {
      const emailSchema = registrationSchema.pick(["email"]);
      const { email } = formik.values;
      const valuesToUse = { email };

      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="We'll need your email address too!"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          validationSchema={emailSchema}
          formValues={valuesToUse}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <TextField
                id="registration-sequence-email-field"
                required
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                variant="outlined"
                color="primary"
              />
            </Box>
          }
        />
      );
    }

    case 3: {
      const passwordSchema = registrationSchema.pick([
        "password",
        "confirmPassword",
      ]);
      const { password, confirmPassword } = formik.values;
      const valuesToUse = { password, confirmPassword };

      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="Let's create a strong password for you!"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          validationSchema={passwordSchema}
          formValues={valuesToUse}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <TextField
                id="registration-sequence-password-field"
                required
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                type="password"
                label="Password"
                variant="outlined"
                color="primary"
              />
              <TextField
                id="registration-sequence-confirm-password-field"
                required
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                type="password"
                label="Repeat password"
                variant="outlined"
                color="primary"
              />
            </Box>
          }
        />
      );
    }

    case 4: {
      const phoneNumberSchema = registrationSchema.pick(["phoneNumber"]);
      const { phoneNumber } = formik.values;
      const valuesToUse = { phoneNumber };
      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="At last, we need your phone number!"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          validationSchema={phoneNumberSchema}
          formValues={valuesToUse}
          sendDataSignal={setSendData}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <MuiTelInput
                value={formik.values.phoneNumber}
                onChange={(value) => {
                  formik.handleChange({
                    target: { name: "phoneNumber", value },
                  });
                }}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                defaultCountry="RO"
                focusOnSelectCountry
                preferredCountries={["RO", "HU", "DE", "FR", "IT", "ES"]}
                name="phoneNumber"
                label="Phone number"
                disableFormatting
              />
            </Box>
          }
        />
      );
    }
  }
};

export default RegisterLogic;
