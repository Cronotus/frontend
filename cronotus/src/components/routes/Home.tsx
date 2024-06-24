import "../../styles/home.css";
import HomeSvg from "/assets/images/undraw_in_love_6sq2.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="home-main-holder">
        <div className="home-head">
          <div className="home-head-title">
            <h1>Welcome to&nbsp;</h1>
            <h1 id="title-name">Cronotus.</h1>
          </div>
        </div>
        <div className="home-body-holder">
          <div className="home-body-left">
            <div className="home-body-description">
              <h1>Together&nbsp;we</h1>
              <h1 className="home-body-keyword">&nbsp;play.&nbsp;</h1>
              <h1>We</h1>
              <h1 className="home-body-keyword">&nbsp;discover.&nbsp;</h1>
              <h1>We</h1>
              <h1 className="home-body-keyword">&nbsp;move.&nbsp;</h1>
              <h1>We</h1>
              <h1 className="home-body-keyword">&nbsp;socialize.&nbsp;</h1>
            </div>
            <h2>
              Have you ever been in a situation where you wanted to go out and
              do some sports, but couldn't because you didn't have anyone to go
              with? We did! That's why you're here. That's why we're here.
            </h2>
            <div className="home-body-button-holder">
              <Button
                className="profile-edit-button-cancel"
                onClick={() =>
                  navigate("/browser", { state: { from: "home" } })
                }
                sx={{
                  ":hover": { backgroundColor: "#2f2e41", color: "white" },
                  backgroundColor: "#f0f0f0",
                  borderRadius: "5px",
                  fontSize: "1rem",
                  color: "black",
                  marginBottom: "2vh",
                  display: "flex",
                }}
              >
                Let's get started
              </Button>
            </div>
          </div>
          <div className="home-body-right">
            <img id="home-body-image" src={HomeSvg} alt="Home image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
