import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Card, Modal, CardHeader, CardActions, CardContent, Collapse, Avatar, Typography, Box } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';

import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { green } from '@mui/material/colors';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment"

import { useDispatch, useSelector } from 'react-redux';
import { DeleteUserTask, reset } from "../app/features/user/AddtaskSlice"
import UpdateTask from './UpdateTask';
import Styles from "../pages/style/home.module.scss"



const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ListTask({ data }) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch()
  const { isSuccess, isLoading } = useSelector(state => state.task.deletedTask)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };



  const handleRemoveTask = (id) => {
    dispatch(DeleteUserTask(id))
    dispatch(reset())
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 44,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card sx={{ maxWidth: 345 }} className={Styles.card} >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: green[500] }} aria-label="task">
            {data.task_msg.slice(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        // title={data.is_completed === 0 ? "Not completed" : "Task Completed"}
        title={moment(data.inbox_display_date).subtract(6, 'days').calendar()}
        // subheader={}
        className={Styles.task_header}
      />

      <CardContent>
        <Typography variant="body2" color="secondary" className={Styles.task_msg}>
          {data.task_msg}
        </Typography>

        <Typography variant="body2" className={Styles.completed}>
          {data.is_completed === 0 ? "Not completed" : "Task Completed"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
          <AiOutlineDelete onClick={() => handleRemoveTask(data.id)} className={Styles.deletedIcon} />


        </IconButton>
        <IconButton aria-label="share">
          {/* <ShareIcon /> */}
          <FiEdit className={Styles.editIcon} onClick={handleOpen} />
        </IconButton>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className={Styles.Box}>
            <UpdateTask data={data} />

          </Box>
        </Modal>

      </CardActions>

    </Card>
  );
}
