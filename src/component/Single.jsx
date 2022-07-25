import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import { List, ListItem, ListItemText } from '@mui/material';



export default function Single({ data }) {


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar src={data.user_icon} alt="user icon" sx={{ bgcolor: "#FF9900" }} aria-label="recipe">

                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">

                    </IconButton>
                }
                title={data.user_name}
                subheader={moment(data.task_date_time_in_utc).format('LLL')}

            />

            <CardContent>
                <Typography variant="h6">
                    {data.task_msg}  </Typography>
                <Typography variant="body1" component="body2" color="secondary">
                    {data.is_completed === 0 ? "Task not completed" : "Tassk Completed"}
                </Typography>

                <List>

                    <ListItem>
                        <ListItemText
                            primary="Task Date"
                            secondary={data.task_date ? data.task_date : null}
                        />
                    </ListItem>

                    <ListItem>
                        <ListItemText
                            primary="Task Time"
                            secondary={data.task_time ? data.task_time : null}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Created Time"
                            secondary={data.created}
                        />
                    </ListItem>

                </List>
            </CardContent>


        </Card>
    );
}
