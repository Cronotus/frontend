import { Box, Button } from "@mui/material";
import "../styles/register.css";
import { ReactNode } from "react";

const RegistrationSequenceBlock = (props: {
  className: string;
  userRequest: string;
  buttonId?: string;
  backButtonId?: string;
  currentSequence: number;
  formContent: ReactNode;
  registrationSequenceSetter: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className={props.className}>
      <h1 id="registration-sequence-block-headline">
        {`${props.userRequest}`}
      </h1>
      {props.formContent}

      {props.currentSequence > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexFlow: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Button
            id={props.backButtonId}
            variant="contained"
            size="large"
            sx={{
              marginTop: "3%",
              marginRight: "3%",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#4238DA" },
            }}
            onClick={() =>
              props.registrationSequenceSetter(props.currentSequence - 1)
            }
          >
            Back
          </Button>
          <Button
            id={props.buttonId}
            variant="contained"
            size="large"
            sx={{
              marginTop: "3%",
              marginLeft: "3%",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "#4238DA" },
            }}
            onClick={() =>
              props.registrationSequenceSetter(props.currentSequence + 1)
            }
          >
            Next
          </Button>
        </Box>
      ) : (
        <Button
          id={props.buttonId}
          variant="contained"
          size="large"
          sx={{
            marginTop: "3%",
            backgroundColor: "black",
            "&:hover": { backgroundColor: "#4238DA" },
          }}
          onClick={() =>
            props.registrationSequenceSetter(props.currentSequence + 1)
          }
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default RegistrationSequenceBlock;
