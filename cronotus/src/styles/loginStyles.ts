export const loginBoxStyles = {
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
};
