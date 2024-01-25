import { useFormik } from "formik";
import { profileEditSchema } from "../services/logic/validation";
import { ProfileInformation } from "../interfaces/in/ProfileInformation";
import { Button, TextField } from "@mui/material";
import "../styles/profile.css";
import { useEffect, useState } from "react";
import { updateProfileFetch } from "../services/api/profile";

const ProfileEdit = (props: {
  className: string;
  userId: string;
  prevValues: ProfileInformation;
  mutateData: () => Promise<any>;
  profileIsEditing: boolean;
  setProfileIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [fieldsToSubmit, setFieldsToSubmit] = useState<
    { [key: string]: string }[]
  >([]);

  const formik = useFormik({
    initialValues: {
      userName: props.prevValues.userName,
      firstName: props.prevValues.firstName,
      lastName: props.prevValues.lastName,
      email: props.prevValues.email,
      phoneNumber: props.prevValues.phoneNumber,
    },
    validationSchema: profileEditSchema,
    onSubmit: (values) => {
      const allFields = Object.entries(values);
      const allPrevFields = Object.entries(props.prevValues);
      allFields.forEach((field) => {
        const prevField = allPrevFields.find(
          (prevField) => prevField[0] === field[0]
        );

        const isFieldAlreadyAdded = fieldsToSubmit.some(
          (addedField) => Object.keys(addedField)[0] === field[0]
        );

        if (prevField && prevField[1] !== field[1] && !isFieldAlreadyAdded) {
          setFieldsToSubmit((prevFields) => [
            ...prevFields,
            { [field[0]]: field[1] },
          ]);
        }
      });
    },
  });

  useEffect(() => {
    console.log(fieldsToSubmit);
    if (fieldsToSubmit.length > 0) {
      updateProfileFetch(props.userId, fieldsToSubmit)
        .then(() =>
          setTimeout(
            () => props.setProfileIsEditing(!props.profileIsEditing),
            1000
          )
        )
        .then(() => props.mutateData())
        .catch((err) => console.error(err));
    }
  }, [fieldsToSubmit]);

  const submitForm = () => {
    formik.handleSubmit();
    setFieldsToSubmit([]);
  };

  return (
    <div className={props.className}>
      <h2>Edit profile</h2>
      <TextField
        id="profile-edit-username"
        name="userName"
        label="Username"
        variant="outlined"
        color="primary"
        sx={{
          width: "100%",
          marginBottom: "1vh",
        }}
        onChange={formik.handleChange}
        value={formik.values.userName}
        onBlur={formik.handleBlur}
        error={formik.touched.userName && Boolean(formik.errors.userName)}
        helperText={formik.touched.userName && formik.errors.userName}
      />
      <TextField
        id="profile-edit-firstname"
        name="firstName"
        label="First name"
        variant="outlined"
        color="primary"
        sx={{
          width: "100%",
          marginBottom: "1vh",
        }}
        onChange={formik.handleChange}
        value={formik.values.firstName}
        onBlur={formik.handleBlur}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
      />
      <TextField
        id="profile-edit-lastName"
        name="lastName"
        label="Last name"
        variant="outlined"
        color="primary"
        sx={{ width: "100%", marginBottom: "1vh" }}
        onChange={formik.handleChange}
        value={formik.values.lastName}
        onBlur={formik.handleBlur}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
      <TextField
        id="profile-edit-email"
        name="email"
        label="Email"
        variant="outlined"
        color="primary"
        sx={{ width: "100%", marginBottom: "1vh" }}
        onChange={formik.handleChange}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        id="profile-edit-phone"
        name="phoneNumber"
        label="Phone number"
        variant="outlined"
        color="primary"
        sx={{ width: "100%", marginBottom: "1vh" }}
        onChange={formik.handleChange}
        value={formik.values.phoneNumber}
        onBlur={formik.handleBlur}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
      />
      <div className="edit-foot-button-holder">
        <Button
          className="profile-edit-button-save"
          type="submit"
          onClick={submitForm}
          sx={{
            ":hover": { backgroundColor: "#f0f0f0", color: "black" },
            backgroundColor: "#2f2e41",
            borderRadius: "5px",
            fontSize: "0.9rem",
            color: "white",
            marginBottom: "2vh",
            display: "flex",
          }}
        >
          Save
        </Button>
        <Button
          className="profile-edit-button-cancel"
          onClick={() => props.setProfileIsEditing(!props.profileIsEditing)}
          sx={{
            ":hover": { backgroundColor: "#f0f0f0", color: "black" },
            backgroundColor: "#2f2e41",
            borderRadius: "5px",
            fontSize: "0.9rem",
            color: "white",
            marginBottom: "2vh",
            display: "flex",
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
