import { useState, useEffect } from "react";
import {
  Card,
  Modal,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Box,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import { green } from "@mui/material/colors";
import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import { DeleteUserTask, reset } from "../app/features/user/AddtaskSlice";
import UpdateTask from "./UpdateTask";
import Styles from "../pages/style/home.module.scss";
import { FetchSingleTask, FetchTask } from "./../app/features/user/fetchTask";
import Single from "./Single";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

export default function ListTask({ data }) {
  const dispatch = useDispatch();
  const { singleTask, deletedTask, isSuccess, isLoading } = useSelector(
    (state) => state.AllTask
  );

  const handleRemoveTask = (id) => {
    dispatch(DeleteUserTask(id));
  };
  useEffect(() => {
    FetchTask();
    dispatch(reset());
  }, [dispatch, isSuccess]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 44,
    p: 4,
    border: "none !important",
  };

  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSingleTask = (id) => {
    setOpenDetails(true);
    dispatch(FetchSingleTask(id));
    return dispatch(reset());
  };

  if (deletedTask?.status === "success") {
    toast.success("Task deleted successfully", {
      toastId: "success2",
    });
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className={Styles.card}>
        <div className="wrw" onClick={(e) => handleSingleTask(data.id)}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: green[500] }} aria-label="task">
                {data.task_msg.slice(0, 1)}
              </Avatar>
            }
            action={<IconButton aria-label="settings"></IconButton>}
            title={moment(data.inbox_display_date)
              .subtract(6, "days")
              .calendar()}
            className={Styles.task_header}
          />

          <CardContent>
            <Typography
              variant="body2"
              color="secondary"
              className={Styles.task_msg}
            >
              {data.task_msg}
            </Typography>

            <Typography variant="body2" className={Styles.completed}>
              {data.is_completed === 0 ? "Not completed" : "Task Completed"}
            </Typography>
          </CardContent>
        </div>
        <CardActions disableSpacing className={Styles.icon__wrapper}>
          <IconButton aria-label="add to favorites">
            <AiOutlineDelete
              onClick={() => handleRemoveTask(data.id)}
              className={Styles.deletedIcon}
            />
          </IconButton>
          <IconButton aria-label="edit" sx={{ marginLeft: "11rem" }}>
            <FiEdit
              className={Styles.editIcon}
              size="20px"
              onClick={handleOpen}
            />
          </IconButton>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className={Styles.Box}>
              <UpdateTask
                data={data}
                handleClose={handleClose}
                setOpen={setOpen}
              />
            </Box>
          </Modal>

          <Modal
            open={openDetails}
            onClose={() => setOpenDetails(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className={Styles.singleInfo}>
              {isLoading ? <CircularProgress /> : <Single data={singleTask} />}
            </Box>
          </Modal>
        </CardActions>
      </Card>
    </>
  );
}
