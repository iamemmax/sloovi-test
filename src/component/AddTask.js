import React, { useEffect, useState } from "react";
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
// import { FetchAssignUser } from "../app/features/user/AssignUserSlice";
import Styles from "../pages/style/home.module.scss";
import { useNavigate } from "react-router-dom";

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
  const [taskMsgErr, setTaskMsgErr] = useState(false);
  const [taskDateErr, setTaskDateErr] = useState(false);
  const [taskTimeErr, setTaskTimeErr] = useState(false);
  const [assigUserErr, setAssigUserErr] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  let { task_msg, task_date, task_time, assigned_user } = input;
  const handleSubmit = (e) => {
    e.preventDefault();
    setTaskMsgErr(false);
    setTaskDateErr(false);
    setTaskTimeErr(false);
    setAssigUserErr(false);

    if (!taskMsgErr && !taskDateErr && !taskTimeErr && !assigUserErr) {
      setTaskMsgErr(true);
      setTaskDateErr(true);
      setTaskTimeErr(true);
      setAssigUserErr(true);
    }

    if (!taskMsgErr) {
      setTaskMsgErr(true);
      return;
    }

    if (!taskDateErr) {
      setTaskDateErr(true);
      return;
    }

    if (!taskTimeErr) {
      setTaskTimeErr(true);
      return;
    }

    if (!assigUserErr) {
      setAssigUserErr(true);
      return;
    }

    dispatch(AddUserTask(input));
    dispatch(reset());
  };
  const { isSuccess, isLoading } = useSelector((state) => state.task);
  useEffect(() => {
    dispatch(FetchTask());
  }, [dispatch, isSuccess]);

  const handleAddTask = () => {
    if (!users) {
      navigate("/");
    }
  };

  return (
    <Container className={Styles.AddTask}>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<FaPlus onClick={handleAddTask} />}
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
                    error={taskMsgErr}
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
                          error={taskDateErr}
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
                          error={taskTimeErr}
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
                      error={assigUserErr}
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
                      <CircularProgress color="secondary" size="30" />
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
