import { Box } from "@mui/material";
import LoginDesign from "../LoginDesign";
import LoginForm from "../LoginForm";
import "../../styles/login.css";
import { loginBoxStyles } from "../../styles/loginStyles";

const Login = (props: { onLogin: () => void }) => {
  return (
    <div id="login-page-background">
      <Box component={"form"} autoComplete="on" sx={loginBoxStyles}>
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
