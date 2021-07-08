import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosHandler";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      margin: "auto",
      width: "80%",
      minHeight: "80px",
      display: "flex",
      flexDirection: "column",
    },
  },
}));

const NewRoundForm = () => {
  const classes = useStyles();
  const [isData, setData] = useState("");
  const [isPlayers, setPlayers] = useState([]);
  const [isCourse, setCourse] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPlayers.length < 1) {
      toast.error("Please select atleast one player", {
        containerId: "normal",
        toastId: "noPlayerSelected",
      });
    } else {
      const data = {
        course: isCourse,
        players: isPlayers,
      };
      axiosInstance.post("/api/rounds/new/", data).then((res) => {
        if (res.status === 201) {
          window.location = `/rounds/${res.data.id}?created=true`;
        }
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/api/rounds/new");
      setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography align="center" component="h1" variant="h5">
        Create a new round
      </Typography>

      <FormControl variant="filled" required>
        <InputLabel id="demo-simple-select-filled-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          name="course"
          value={isCourse}
          onChange={(event) => setCourse(event.target.value)}
        >
          <MenuItem value="" disabled>
            <em>None</em>
          </MenuItem>
          {isData
            ? isData.courses.map((course) => (
                <MenuItem key={course.id * 0.563} value={course.id}>
                  {course.name}
                </MenuItem>
              ))
            : null}
        </Select>
      </FormControl>
      <Autocomplete
        multiple
        name="players"
        options={isData.users ? isData.users : ["loading..."]}
        getOptionLabel={(option) => option.username}
        filterSelectedOptions
        onChange={(event, players) =>
          setPlayers(players.map((player) => player.id))
        }
        renderInput={(params) => (
          <TextField
            name="players"
            {...params}
            variant="outlined"
            label="Players"
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary" size="small">
        Start round!
      </Button>
    </form>
  );
};

export default NewRoundForm;
