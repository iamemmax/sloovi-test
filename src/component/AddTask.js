import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Accordion,
  Grid,
  Select,
  AccordionDetails,
  AccordionSummary,
  InputAdornment,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { FaPlus, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AddUserTask, reset } from "../app/features/user/AddtaskSlice";
import { FetchTask } from "../app/features/user/fetchTask";
import Styles from "../pages/style/home.module.scss";
// import { useNavigate } from "react-router-dom";

export const AddTask = () => {
  const { users } = useSelector((auth) => auth.users);
  const date = new Date();
  const offset = date.getTimezoneOffset();

  const [input, setInput] = useState({
    task_msg: "",
    task_date: null,
    task_time: null,
    assigned_user: null,
    time_zone: offset,
    is_completed: 0,
  });

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  let { task_msg, task_date, task_time, assigned_user } = input;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddUserTask(input));
  };
  const { isSuccess, task, isLoading } = useSelector((state) => state.task);
  useEffect(() => {
    dispatch(reset());
    dispatch(FetchTask());
  }, [dispatch, isSuccess]);

  if (isSuccess && task[0]?.status === "1") {
    toast.success("Task added successfully", {
      toastId: "success1",
    });
  }

  return (
    <Container className={Styles.AddTask}>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaPlus />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography
                variant="h6"
                component="h2"
                className={Styles.addTask_header}
              >
                {" "}
                ADD TASK
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <form method="post" onSubmit={handleSubmit}>
                <div className="password">
                  <TextField
                    type="text"
                    label="Task Description"
                    name="task_msg"
                    value={task_msg}
                    fullWidth
                    onChange={handleInput}
                    // onChange={handleInput}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="
                        start"
                        >
                          <FaUser />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <br />
                <div className="grid">
                  <Grid container spacing={2}>
                    <Grid item sm={6}>
                      <div className="date">
                        <TextField
                          type="date"
                          onChange={handleInput}
                          defaultValue={task_date}
                          name="task_date"
                          variant="outlined"
                          fullWidth
                        />
                      </div>
                    </Grid>
                    <Grid item sm={6}>
                      <div className="timetime">
                        <TextField
                          type="time"
                          onChange={handleInput}
                          name="task_time"
                          defaultValue={task_time}
                          variant="outlined"
                          fullWidth
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
                <br />

                <div className="select">
                  <FormControl size="small" fullWidth>
                    <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                    <Select
                      labelId="demo-select-small"
                      id="demo-select-small"
                      value={assigned_user}
                      name="assigned_user"
                      label="Assign user"
                      onChange={handleInput}
                    >
                      {users?.map((x) => (
                        <MenuItem value={x.id} key={x.id}>
                          {x.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <br />
                <div className={Styles.btn_group}>
                  <Button color="primary" variant="outlined">
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    {isLoading ? (
                      <CircularProgress size="20px" color="secondary" />
                    ) : (
                      "Save"
                    )}
                  </Button>
                </div>
              </form>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>

      {/* list all task */}
    </Container>
  );
};
