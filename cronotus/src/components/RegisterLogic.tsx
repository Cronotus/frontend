import { useState } from "react";
import RegistrationSequenceBlock from "./RegistrationSequenceBlock";
import "../styles/register.css";
import { Box, TextField } from "@mui/material";

const RegisterLogic = () => {
  const [registrationSequence, setRegistrationSequence] = useState<number>(0);

  switch (registrationSequence) {
    case 0: {
      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="What's your real name?"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <TextField
                id="registration-sequence-firstname-field"
                required
                label="First name"
                variant="outlined"
                color="primary"
              />
              <TextField
                id="registration-sequence-lastname-field"
                required
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
      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="How should we call you?"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <TextField
                id="registration-sequence-username-field"
                required
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
      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="We'll need your email address too!"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <TextField
                id="registration-sequence-email-field"
                required
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
      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="Let's create a strong password for you!"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <TextField
                id="registration-sequence-password-field"
                required
                type="password"
                label="Password"
                variant="outlined"
                color="primary"
              />
              <TextField
                id="registration-sequence-confirm-password-field"
                required
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
      return (
        <RegistrationSequenceBlock
          className="registration-sequence"
          userRequest="At last, we need your phone number!"
          currentSequence={registrationSequence}
          registrationSequenceSetter={setRegistrationSequence}
          formContent={
            <Box
              component={"form"}
              sx={{ display: "flex", flexDirection: "row", flexFlow: "row" }}
            >
              <TextField // use mui-tel-input here https://github.com/viclafouch/mui-tel-input
                id="registration-sequence-phone-field"
                required
                type="phone"
                label="Phone number"
                variant="outlined"
                color="primary"
              />
            </Box>
          }
        />
      );
    }

    default: {
      return "Step 1";
    }
  }
};

export default RegisterLogic;
