import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment"

import { useDispatch, useSelector } from 'react-redux';
import { DeleteUserTask, reset } from "../app/features/user/AddtaskSlice"
import UpdateTask from './UpdateTask';




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



  return (
    <Card sx={{ maxWidth: 345 }} >
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
        title={data.task_msg}
        subheader={moment(data.task_date).subtract(6, 'days').calendar()}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {data.is_completed === 0 ? "Not completed" : "Task Completed"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
          <AiOutlineDelete onClick={() => handleRemoveTask(data.id)} />


        </IconButton>
        <IconButton aria-label="share">
          {/* <ShareIcon /> */}
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {/* <ExpandMoreIcon /> */}
          <FiEdit />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <UpdateTask data={data} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
