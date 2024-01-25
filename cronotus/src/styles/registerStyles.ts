export const registerBoxStyles = {
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
};

export const registrationSequenceBlockBoxStyles = {
  display: "flex",
  flexDirection: "row",
  flexFlow: "row",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
};

export const registrationSequenceBlockButtonStyles = {
  marginTop: "3%",
  marginRight: "3%",
  backgroundColor: "black",
  "&:hover": { backgroundColor: "#4238DA" },
};
