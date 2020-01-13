import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import * as axios from 'axios';
import { API_BASE_URI } from "../../config";
import { getToken } from "../../helpers/get-token";

const useStyles = makeStyles({
  card: {
    backgroundColor: "#F5F5F5",
    width: '100%',
    marginBottom: 20.
  },
  media: {
    height: 140
  }
});

export default function VideoTile(props) {
  const classes = useStyles();
  const { description, title, id } = props;

  const onDelete = async () => {
    await axios.delete(`${API_BASE_URI}/video/${id}`, { headers: { authorization: `Bearer ${getToken()}` }})
    props.refreshVideos()
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link className="link-no-style" to={`edit/${id}`}>
          <Button size="small" color="primary">
            EDIT
          </Button>
        </Link>
        <Button onClick={onDelete} size="small" style={{ color: "#f44336" }}>
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
}
