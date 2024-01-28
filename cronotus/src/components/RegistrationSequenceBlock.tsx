import { Box, Button } from "@mui/material";
import "../styles/register.css";
import { ReactNode } from "react";
import * as Yup from "yup";
import {
  registrationSequenceBlockBoxStyles,
  registrationSequenceBlockButtonStyles,
} from "../styles/registerStyles";

const RegistrationSequenceBlock = (props: {
  className: string;
  userRequest: string;
  buttonId?: string;
  backButtonId?: string;
  currentSequence: number;
  formContent: ReactNode;
  formValues: any;
  validationSchema: Yup.ObjectSchema<any>;
  registrationSequenceSetter: React.Dispatch<React.SetStateAction<number>>;
  sendDataSignal?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleNextClick = () => {
    props.validationSchema
      .validate(props.formValues, { abortEarly: false })
      .then(() => {
        if (props.currentSequence + 1 === 5) {
          props.sendDataSignal!(true);
        }
        props.registrationSequenceSetter(props.currentSequence + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={props.className}>
      <h1 id="registration-sequence-block-headline">
        {`${props.userRequest}`}
      </h1>
      {props.formContent}

      {props.currentSequence > 0 ? (
        <Box sx={registrationSequenceBlockBoxStyles}>
          <Button
            id={props.backButtonId}
            variant="contained"
            size="large"
            sx={registrationSequenceBlockButtonStyles}
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
            sx={registrationSequenceBlockButtonStyles}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </Box>
      ) : (
        <Button
          id={props.buttonId}
          variant="contained"
          size="large"
          sx={registrationSequenceBlockButtonStyles}
          onClick={handleNextClick}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default RegistrationSequenceBlock;
