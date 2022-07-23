import React, { useEffect, useState } from 'react'
import { Accordion, Stack, Grid, Select, AccordionDetails, AccordionSummary, InputAdornment, TextField, Typography, MenuItem, InputLabel, FormControl, Button, Container } from "@mui/material"
import { FaPlus, FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux';
import { UpdateUserTask, reset } from "../app/features/user/AddtaskSlice"
import { FetchTask } from "../app/features/user/fetchTask"
import Styles from "../pages/style/home.module.scss"


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
    let userData = { id: data.id, input }


    const dispatch = useDispatch()
    console.log(userData)
    const handleInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // setInput({ ...input, [e.target.name]: e.target.value })
        dispatch(UpdateUserTask(userData))
        dispatch(reset())
    }





    return (
        <Container className={Styles.update_container}>

            <Grid container spacing={3}>

                <Grid item sm={12}>
                    <Typography variant="h5" component="h5" sx={{ padding: "20px", textAlign: "center", fontWeight: "600" }}>UPDATE TASK</Typography>

                    <form method="post" onSubmit={handleSubmit}>
                        <div className="password">
                            <TextField
                                type="text"
                                label="Task Description"
                                name="task_msg"
                                defaultValue={task_msg}
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
                            <Grid container spacing={1}>
                                <Grid item sm={6}>

                                    <div className="date">

                                        <TextField type="date" onChange={handleInput} name="task_date" defaultValue={task_date} variant='outlined' fullWidth />

                                    </div>


                                </Grid>
                                <Grid item sm={6}>

                                    <div className="timetime">
                                        <TextField type="time" onChange={handleInput} name="task_time" defaultValue={task_time} variant='outlined' fullWidth />
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
                                    defaultValue={assigned_user}
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
                        <br />
                        <div className="select">
                            <FormControl
                                size="small" fullWidth>
                                <InputLabel id="demo-multiple-name-label">Completed</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    defaultValue={is_completed}
                                    name="is_completed"
                                    label="is_completed"
                                    onChange={handleInput}

                                >


                                    <MenuItem value={0} >No</MenuItem>
                                    <MenuItem value={1} >Yes</MenuItem>




                                </Select>
                            </FormControl>
                        </div>
                        <br />
                        <div className={Styles.btn_group}>

                            <Button color="secondary" variant="outlined" sx={{ width: "130px", marginRight: "10px" }}>Cancel</Button>
                            <Button type="submit" variant="contained" sx={{ width: "130px" }}>save</Button>
                        </div>
                    </form>
                </Grid>
            </Grid>


            {/* list all task */}

        </Container>

    )
}

export default UpdateTask