import { Box } from "@mui/material";
import RegisterDesign from "../RegisterDesign";

const Register = () => {
  return (
    <div id="register-page-background">
      <Box
        component={"form"}
        autoComplete="on"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "50ch" },
          flexFlow: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "93vh",
          margin: "3vh",

          "& .register-design-background": {
            borderRadius: "20px",
            borderLeft: "none",
            backgroundColor: "white",
            height: "100%",
            width: "100%",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <RegisterDesign />
      </Box>
    </div>
  );
};

export default Register;
