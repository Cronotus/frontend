import { Link, useNavigate } from "react-router-dom";
import "../../styles/browser.css";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSports } from "../../services/api/sport";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { eventCreationSchema } from "../../services/logic/validation";
import { createEventFetch } from "../../services/api/events";
import { getOrganizerIdFromToken } from "../../services/logic/getOrganizerIdFromToken";
import { getNewTokens } from "../../services/logic/getNewTokens";

export const CreateEvent = () => {
  const navigate = useNavigate();

  const { data: sports, isLoading, error } = useSports();

  const formik = useFormik({
    initialValues: {
      organizerId: "",
      sportId: "",
      name: "",
      description: "",
      location: "",
      startDate: dayjs() as unknown as string,
      capacity: 0,
      isEnded: false,
    },
    onSubmit: async (values) => {
      const { organizerId } = await getOrganizerIdFromToken();
      await getNewTokens();

      values.organizerId = organizerId;

      createEventFetch(values)
        .then(() => navigate("/browser"))
        .catch((err) => {
          console.log(err);
          alert("Could not create event");
        });
    },
    validationSchema: eventCreationSchema,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className="browser-main-holder">
      <div className="browser-header">
        <Link
          id="browser-link"
          to={{
            pathname: "/browser",
          }}
        >
          <h1>See what others are up to</h1>
        </Link>
        <Link
          id="browser-link"
          to={{
            pathname: "/create-event",
          }}
        >
          <h1>Create a new event</h1>
        </Link>
      </div>
      <div className="event-create-body">
        <h1>Let's create your own event!</h1>
        <TextField
          id="event-create-name"
          name="name"
          label="Event name"
          variant="outlined"
          color="primary"
          sx={{ width: "50%", marginBottom: "1vh" }}
          onChange={formik.handleChange}
          value={formik.values.name}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="event-create-description"
          name="description"
          label="Description"
          variant="outlined"
          multiline
          color="primary"
          sx={{ width: "50%", marginBottom: "1vh" }}
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          id="event-create-location"
          name="location"
          label="Location"
          variant="outlined"
          color="primary"
          sx={{ width: "50%", marginBottom: "1vh" }}
          onChange={formik.handleChange}
          value={formik.values.location}
          onBlur={formik.handleBlur}
          error={formik.touched.location && Boolean(formik.errors.location)}
          helperText={formik.touched.location && formik.errors.location}
        />
        <FormControl sx={{ width: "50%", marginBottom: "1vh" }}>
          <InputLabel id="event-create-sport-labelid">Sport</InputLabel>
          <Select
            labelId="event-create-sport-labelid"
            id="event-create-sport"
            value={formik.values.sportId}
            onBlur={formik.handleBlur}
            error={formik.touched.sportId && Boolean(formik.errors.sportId)}
            label="Sport"
            onChange={(e) => formik.setFieldValue("sportId", e.target.value)}
          >
            {sports!.map((sport) => (
              <MenuItem key={sport.id} value={sport.id}>
                {sport.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start date"
            sx={{ width: "50%", marginBottom: "1vh" }}
            defaultValue={dayjs()}
            value={formik.values.startDate as unknown as Dayjs}
            onChange={(date) => formik.setFieldValue("startDate", date)}
          />
        </LocalizationProvider>
        <TextField
          id="event-create-capacity"
          name="capacity"
          label="Capacity"
          type="number"
          variant="outlined"
          color="primary"
          sx={{ width: "50%", marginBottom: "1vh" }}
          onChange={formik.handleChange}
          value={formik.values.capacity}
          onBlur={formik.handleBlur}
          error={formik.touched.capacity && Boolean(formik.errors.capacity)}
          helperText={formik.touched.capacity && formik.errors.capacity}
        />
        <div className="event-create-buttons">
          <Button
            className="event-create-button-submit"
            onClick={() => formik.handleSubmit()}
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
            Submit
          </Button>
          <Button
            className="event-create-button-cancel"
            onClick={() => navigate("/browser")}
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
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};
