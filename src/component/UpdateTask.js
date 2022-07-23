import React, { useEffect, useState } from 'react'
import { Accordion, Grid, Select, AccordionDetails, AccordionSummary, InputAdornment, TextField, Typography, MenuItem, InputLabel, FormControl, Button, Container } from "@mui/material"
import { FaPlus, FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux';
import { AddUserTask, reset } from "../app/features/user/AddtaskSlice"
import { FetchTask } from "../app/features/user/fetchTask"

const UpdateTask = ({ data }) => {
    const { users } = useSelector(auth => auth.users)
    const date = new Date();
    const offset = date.getTimezoneOffset();
    let { task_msg, task_date, task_time, assigned_user, is_completed } = data
    const [input, setInput] = useState({
        task_msg,

        task_date,
        task_time,
        assigned_user,
        time_zone: offset,
        is_completed
    })
    console.log(users)
    const dispatch = useDispatch()

    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        // setInput({ ...input, [e.target.name]: e.target.value })
    }




    // let { task_msg, task_date, task_time, assigned_user, time_zone } = input


    return (
        <Container>
            <Grid container spacing={3}>

                <Grid item sm={12}>

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
                                        <TextField type="date" onChange={handleInput}
                                            value={{}} name="task_date" label="Date" variant='outlined' fullWidth />
                                    </div>


                                </Grid>
                                <Grid item sm={6}>

                                    <div className="timetime">
                                        <TextField type="time" onChange={handleInput} name="task_time" value={{}} label="Time" variant='outlined' fullWidth />
                                    </div>

                                </Grid>
                            </Grid>

                        </div>
                        <br />

                        <div className="select">
                            <FormControl
                                size="small" fullWidth>
                                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={assigned_user}
                                    name="assigned_user"
                                    label="Assign user"
                                    onChange={handleInput}

                                >
                                    {users?.map(x => (

                                        <MenuItem value={x.id} key={x.id}>{x.name}</MenuItem>
                                    )
                                    )}


                                </Select>
                            </FormControl>
                        </div>
                        <div className="select">
                            <FormControl
                                size="small" fullWidth>
                                <InputLabel id="demo-multiple-name-label">Completed</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={is_completed}
                                    name="assigned_user"
                                    label="Assign user"
                                    onChange={handleInput}

                                >


                                    <MenuItem value={0} >No</MenuItem>
                                    <MenuItem value={1} >Yes</MenuItem>




                                </Select>
                            </FormControl>
                        </div>
                        <br />
                        <div>

                            <Button>Cancel</Button>
                            <Button type="submit" variant="contained">save</Button>
                        </div>
                    </form>
                </Grid>
            </Grid>


            {/* list all task */}

        </Container>

    )
}

export default UpdateTask