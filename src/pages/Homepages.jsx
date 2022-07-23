import React, { useEffect, useState } from 'react'
import { Accordion, Grid, AccordionDetails, AccordionSummary, InputAdornment, TextField, Typography, MenuItem, InputLabel, FormControl, Button, Container } from "@mui/material"
import { FaPlus, FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux';
import { FetchTask } from "../app/features/user/fetchTask"
import { FetchAssignUser } from "../app/features/user/AssignUserSlice"
import { AddTask } from '../component/AddTask';
import Loading from './../component/config/Loading';
import ListTask from '../component/ListTask';

import Styles from "./style/home.module.scss"

export const Homepages = () => {

  const { task, isLoading, isSuccess, isError } = useSelector(state => state.AllTask)
  useEffect(() => {
    dispatch(FetchTask())
    dispatch(FetchAssignUser())
  }, [])
  const dispatch = useDispatch()


  return (
    <div className={Styles.container}>
      <Container className={Styles.wrapper}>
        <AddTask />
        <br />
        <div>
          {isLoading ? <Loading /> : <>
            {/* <div className={Styles.createBtn}>
              <Button variant="contained" color="secondary" className={Styles.btn}>Create Task</Button>
            </div> */}
            <Typography variant="h4" component="h2" className={Styles.header}>ALL TASKS</Typography>
            <Grid container spacing={3}>
              {task?.map(x => (
                <Grid item md={3} lg={4}>
                  <ListTask key={x.id} data={x} />
                </Grid>
              )
              )}
            </Grid>
          </>}
        </div>


        {/* list all task */}

      </Container>
    </div>
  )
}



