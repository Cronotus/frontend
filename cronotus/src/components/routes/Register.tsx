import { Box } from "@mui/material";
import RegisterDesign from "../RegisterDesign";
import { registerBoxStyles } from "../../styles/registerStyles";

const Register = () => {
  return (
    <div id="register-page-background">
      <Box component={"form"} autoComplete="on" sx={registerBoxStyles}>
        <RegisterDesign />
      </Box>
    </div>
  );
};

export default Register;
