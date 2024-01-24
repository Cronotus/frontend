import { ProfileInformation } from "../interfaces/in/ProfileInformation";

const ProfileHead = (props: {
  profileInformation: ProfileInformation;
  className: string;
}) => {
  return (
    <div className={props.className}>
      <h2>Good to see you again, {props.profileInformation.userName}!</h2>
    </div>
  );
};

export default ProfileHead;
