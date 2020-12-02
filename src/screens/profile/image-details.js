import React, { useState, useEffect } from "react";
import "./image-details.css";
import {
  Modal,
  Avatar,
  FormControl,
  InputLabel,
  Input,
  Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PROFILE_ICON from "../../assets/profile_icon.png";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    height: "430px",
    display: "flex"
  };
}

const useStyles = makeStyles(theme => ({
  editFormContainer: {
    position: "absolute",
    width: 800,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #7f7f7f",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const modalDetails = ({
  imageDetails,
  handleClose,
  likeHandler,
  commentHandler
}) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [modalDetails, setModalDetails] = useState({});
  const [comment, setComment] = useState("");
  const [commentErr, setCommentErr] = useState(false);

  useEffect(() => {
    setModalDetails(imageDetails);
    setComment("");
  }, [imageDetails]);

  return (
    <div className="image-details">
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.editFormContainer}>
          <div className="img-container">
            <img src={modalDetails.media_url} alt={modalDetails.id} />
          </div>
          <div className="other-details-container">
            <div className="profile-username">
              <Avatar src={PROFILE_ICON} />
              <span>{modalDetails.username}</span>
            </div>
            <div>
              <div>{modalDetails.caption}</div>
              <div>
                {modalDetails.hashtags &&
                  modalDetails.hashtags.map(hashtag => {
                    return (
                      <span className="hashtag" key={hashtag}>
                        #{hashtag}
                      </span>
                    );
                  })}
              </div>
              <div className="post-comments">
                {modalDetails.comments &&
                  modalDetails.comments.map((comment, index) => {
                    return (
                      <div key={index}>
                        <strong>{comment.username}</strong>:
                        <span>{comment.comment}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="like-comments-container">
              <div className="likes-container" onClick={likeHandler}>
                {modalDetails.likedByme ? (
                  <FavoriteIcon style={{ color: "red" }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
                {modalDetails.likes && <span>{modalDetails.likes} likes</span>}
              </div>

              <div className="comments-container">
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="my-input">Add comment</InputLabel>
                  <Input
                    type="text"
                    id="my-input"
                    aria-describedby="my-helper-text"
                    value={comment}
                    onChange={event => {
                      setComment(event.target.value);
                      setCommentErr(false);
                    }}
                  />
                  {commentErr && (
                    <span className="error-message">required</span>
                  )}
                </FormControl>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={false}
                  onClick={() => {
                    if (!comment) {
                      setCommentErr(true);
                      return;
                    }
                    commentHandler(comment);
                  }}
                >
                  ADD
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default modalDetails;
