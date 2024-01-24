import { ProfileInformation } from "../interfaces/in/ProfileInformation";
import ProfileBodyInfoBox from "./ProfileBodyInfoBox";
import "../styles/profile.css";

const PorfileMyInformation = (props: {
  profileInformation: ProfileInformation;
  className: string;
}) => {
  return (
    <div className={props.className}>
      <h3>Personal information</h3>
      <ProfileBodyInfoBox
        className="profile-infobox-holder"
        text="First Name"
        infoToShow={props.profileInformation.firstName}
      />
      <ProfileBodyInfoBox
        className="profile-infobox-holder"
        text="Last Name"
        infoToShow={props.profileInformation.lastName}
      />
      <ProfileBodyInfoBox
        className="profile-infobox-holder"
        text="Email"
        infoToShow={props.profileInformation.email}
      />
      <ProfileBodyInfoBox
        className="profile-infobox-holder"
        text="Phone Number"
        infoToShow={props.profileInformation.phoneNumber}
      />
    </div>
  );
};

export default PorfileMyInformation;
