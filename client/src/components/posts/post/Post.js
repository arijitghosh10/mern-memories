import { Button, Card, CardActions, CardHeader, CardMedia, Typography,IconButton, ButtonBase, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import React, { useState } from "react";
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import useStyles from './styles';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Confirmation from "../../Confirmation";

const Post = ({ post,setCurrId }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const [likes,setLikes] = useState(post?.likes);
    const userId = user?.result.sub || user?.result?._id;
    const hasLikedPost = post?.likes?.find((like) => like === userId);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = ()=>{
        dispatch(deletePost(post._id))
    }
    const handleLikePost = () =>{
        dispatch(likePost(post._id));
        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== userId));
        } else{
            setLikes([...post.likes, userId]);
        }
    }
    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === userId)
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
      };
    const navigate = useNavigate();
    const handleEdit = (e) =>{
        e.stopPropagation();
        setCurrId(post._id);
        window.scrollTo(0,0);
    }
    const openPost = () =>{
        navigate(`/posts/${post._id}`)
    }
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
        <Card sx={{ borderRadius:'0.75rem',marginBlock:'0.55rem' }}>
            <ButtonBase sx={{ display:'block',textAlign:'initial'}} onClick={openPost}>
                <CardHeader
                    sx={{
                        '& .MuiCardHeader-subheader':{
                            fontSize:'0.8rem',
                            fontWeight:'700',
                        }
                    }}
                    className={classes.header}
                    action={
                        <div style={{ margin:'0.25rem 0.5rem 0 0',opacity:'0.8' }} onClick={handleEdit} aria-label="settings">
                            {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && <EditIcon />}
                        </div>
                    }
                    title={post.name}
                    subheader={moment(post.createdOn).fromNow()}
                />
                <CardMedia className={classes.media} component="img" image={post.selectedFile} title={post.creator} />
                <div className={classes.content}>
                    <div>
                        <Typography sx={{ fontFamily:'Helvetica',fontWeight:'600',fontSize:'1.6rem',lineHeight:'1.2'}} textTransform="capitalize">
                            {post.title}
                        </Typography>
                        <Typography sx={{ color:'#242F9B' }} variant="h7">
                            {post.tags.map((tag)=>(
                                `#${tag} `
                            ))}
                        </Typography>
                    </div>
                    <Typography sx={{ fontSize:'1.2rem',fontFamily:'Times New Roman',fontWeight:'500',lineHeight:1.25 }}>
                        {post.message}
                    </Typography>
                </div>
            </ButtonBase>
            <CardActions className={classes.actions}>
                <Button component={!user?.result ? Link : Button} 
                    to="/auth" color={user?.result ? 'primary' : 'info'}  
                    onClick={handleLikePost} 
                    aria-label="like"
                >
                    <Likes />
                </Button>
                {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="secondary" onClick={handleClickOpen}>
                        <DeleteIcon fontSize="small" /> Delete
                    </Button>
                    
                )}
                <Confirmation 
                    titleText='Confirm Delete'
                    contentText='Are you sure you want to delete the post?'
                    open={open}
                    handleClose={handleClose}
                    clickHandler={handleDelete}
                    actionText='Delete'
                />
            </CardActions>
        </Card>
    )
}

export default Post;