import { Link, useNavigate } from "react-router-dom";
import "../../styles/notfound.css";
import NotFoundImage from "/assets/images/undraw_page_not_found_re_e9o6.svg";
import { Button } from "@mui/material";

const NoMatch = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="no-match">
        <h1>Well... Looks like there's nothing here.</h1>
        <img src={NotFoundImage} alt="Page not found" />
        <Link to="/"></Link>
        <Button
          className="no-match-button"
          onClick={() => navigate("/")}
          sx={{
            ":hover": { backgroundColor: "#f0f0f0", color: "black" },
            backgroundColor: "#2f2e41",
            borderRadius: "5px",
            fontSize: "0.9rem",
            color: "white",
            display: "flex",
            marginTop: "4vh",
          }}
        >
          go back home
        </Button>
      </div>
    </>
  );
};

export default NoMatch;
