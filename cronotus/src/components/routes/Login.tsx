import { Box } from "@mui/material";
import LoginDesign from "../LoginDesign";
import LoginForm from "../LoginForm";
import "../../styles/login.css";

const Login = (props: { onLogin: () => void }) => {
  return (
    <div id="login-page-background">
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
          "& .form-design": {
            height: "100%",
            width: "150%",
            backgroundColor: "#e9e9e9",
            borderRadius: "20px 0 0 20px",
            borderRight: "none",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexFlow: "column",
          },

          "& .form-inputs": {
            borderRadius: "0 20px 20px 0",
            borderLeft: "none",
            backgroundColor: "white",
            height: "100%",
            width: "80%",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",
          },

          "& #login-headline-text": {
            position: "absolute",
            flexFlow: "row",
            flexDirection: "row",
            display: "flex",
            top: "2%",
            left: "5%",
            justifySelf: "center",
            fontSize: "3vw",
            width: "80%",
            fontFamily: "Trebuchet MS",
          },

          "& #login-svg": {
            marginTop: "10%",
            width: "60%",
          },

          "& .activity-name": {
            color: "#4238DA",
          },
        }}
      >
        <LoginDesign
          className="form-design"
          headlineTextId="login-headline-text"
          svgId="login-svg"
          activityName="activity-name"
        />
        <LoginForm className="form-inputs" onLogin={props.onLogin} />
      </Box>
    </div>
  );
};

export default Login;
