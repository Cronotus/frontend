import "../../styles/profile.css";
import ProfileHead from "../ProfileHead";
import PorfileMyInformation from "../ProfilMyInformation";
import { useProfile } from "../../services/api/profile";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";

interface CustomJwtPayload extends JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
}

const Profile = (props: { onLogout: () => void }) => {
  const token = localStorage.getItem("accessToken");
  const decodedToken = token ? jwtDecode<CustomJwtPayload>(token) : null;
  const userId =
    decodedToken?.[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];

  console.log;
  const { data: profileInfo, isLoading, error } = useProfile(userId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="profile-main-holder">
      <div className="profile-main-first-column">
        <ProfileHead
          profileInformation={profileInfo!}
          className="profile-head"
        />
        <PorfileMyInformation
          profileInformation={profileInfo!}
          className="profile-myinfos"
        />
      </div>
      <div className="profile-main-second-column">
        <Button
          className="profile-logout-button"
          onClick={props.onLogout}
          sx={{
            ":hover": { backgroundColor: "#2f2e41", color: "white" },
            backgroundColor: "#f0f0f0",
            borderRadius: "5px",
            fontSize: "1.03rem",
            color: "black",
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
