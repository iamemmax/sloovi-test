import React, { useEffect } from 'react'
import { Grid, Typography, Container } from "@mui/material"
// import { FaPlus, FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from 'react-redux';
import { FetchTask } from "../app/features/user/fetchTask"
import { FetchAssignUser } from "../app/features/user/AssignUserSlice"
import { AddTask } from '../component/AddTask';
import Loading from './../component/config/Loading';
import ListTask from '../component/ListTask';
import { useNavigate } from "react-router-dom"
import Styles from "./style/home.module.scss"

export const Homepages = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { tasks, isLoading } = useSelector(state => state.AllTask)
  const { user } = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(FetchTask())
    dispatch(FetchAssignUser())
    if (!user) { navigate("/") }
  }, [dispatch, navigate, user])


  return (
    <div className={Styles.container}>
      <Container className={Styles.wrapper}>
        <AddTask />
        <br />
        <div>
          {isLoading && <Loading />}

          <Typography variant="h4" component="h2" className={Styles.header}>ALL TASKS</Typography>
          <Grid container spacing={3}>
            {tasks?.map(x => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <ListTask key={x.id} data={x} />
              </Grid>
            )
            )}
          </Grid>

        </div>


        {/* list all task */}

      </Container>
    </div>
  )
}



