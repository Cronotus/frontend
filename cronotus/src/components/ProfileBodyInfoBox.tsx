import "../styles/profile.css";

const ProfileBodyInfoBox = (props: {
  className: string;
  text: string;
  infoToShow: string;
}) => {
  return (
    <div className={props.className}>
      <text className="profile-myinfos-title">{props.text}: </text>
      <text>{props.infoToShow}</text>
    </div>
  );
};

export default ProfileBodyInfoBox;
