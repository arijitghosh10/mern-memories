import { Box, Button, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postComment } from '../../actions/posts';
import useStyles from './styles';
import Picker from 'emoji-picker-react';

const CommentSection = ({ post }) => {
    const classes = useStyles();
    const [comments, setComments] = useState(post?.comments)
    const [comment,setComment] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const styles = {
        position:'absolute',
        top: '50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        border: '2px solid #e4cbf0',
    }
    const handleClose = () => setOpen(false);
    const onEmojiClick = (event, emojiObject) => {
        setComment(prevInput => prevInput + emojiObject.emoji);
    };

    const user = JSON.parse(localStorage.getItem('profile'));
    const handleComment = async() =>{
        setComment('');
        const allComments = await dispatch(postComment(`${user?.result?.name}: ${comment}`, post._id));
        setComments(allComments);
    }
    return (
        <div>
            <div className={classes.outerContainer}>
                <div className={classes.innerContainer}>
                    <Typography gutterBottom variant='h6'>
                        {comments?.length ? comments?.length : 'No'} comment{comments?.length === 1 ? '' : 's'}
                    </Typography>
                    {comments?.map((com,idx)=> (
                        <Typography key={idx} gutterBottom variant='subtitle1'>
                            <strong>{com.split(': ')[0]}</strong>
                            {com.split(':')[1]}
                        </Typography>
                    ))}
                </div>
                {user?.result?.name ? (
                <div className={classes.comment}>
                    <Typography variant='h6' gutterBottom>Leave a comment...</Typography>
                    <TextField 
                        sx={{ position:'relative'}}
                        fullWidth
                        placeholder='Type Here😄'
                        multiline
                        rows={4}
                        value={comment}
                        onChange={(e)=> setComment(e.target.value)}
                        variant='outlined'
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <img
                                        style={{ cursor:'pointer',position:'absolute',top:'10px' }}
                                        src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
                                        onClick={() => setOpen(true)} 
                                    />
                                    <Modal disableEnforceFocus open={open} onClose={handleClose}>
                                        <Box>
                                            <Picker 
                                                pickerStyle={styles} 
                                                onEmojiClick={onEmojiClick} 
                                                searchPlaceholder='Search emoji...'
                                            />
                                        </Box>
                                    </Modal>
                                </InputAdornment>
                            )}
                        }
                    />
                    <Button variant='contained' fullWidth 
                        onClick={handleComment} 
                        sx={{ marginTop:'0.75rem',visibility:`${comment.trim() ? 'visible' : 'hidden'}`}}
                    >
                        Comment
                    </Button>
                </div>
                ): 
                <div style={{ display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                    <Typography sx={{ fontSize:'1.25rem'}}>LogIn or SignUp to comment</Typography>
                    <Button onClick={()=> navigate('/auth')} variant='contained'>
                        Lets Go!
                    </Button>
                </div>}
            </div>
        </div>
    )
}

export default CommentSection;
