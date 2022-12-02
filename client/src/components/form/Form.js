import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import FileBase from 'react-file-base64';
import useStyles from  './styles';
import { useDispatch,useSelector } from 'react-redux';
import { createPost, updatePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Form = ({ currId,setCurrId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector((state)=> currId ? state.posts.posts.find((el)=>el._id===currId) : null);
    const initialState = {
        title:'',message:'',tags:'',selectedFile:''
    }
    const [postData,setPostData] = useState(initialState);
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(()=>{
        if(post) setPostData(post)
    },[post])
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(currId) {
            dispatch(updatePost(currId,{...postData,name:user?.result?.name }))
        }
        else dispatch(createPost({...postData,name:user?.result?.name },navigate));
        handleClr()
    }
    const handleClr = () =>{
        setCurrId(null)
        setPostData(initialState);
    }

    return (
        <Paper className={classes.paper}>
            {!user?.result?.name ? 
                <Typography sx={{ marginBlock:'2rem'}} variant="h5" align="center">
                    LogIn or SignUp to Create your own post,Like other posts and comment on them
                </Typography> : 
                <form autoComplete="off" noValidate  onSubmit={handleSubmit} className={classes.form}>
                    <Typography fontFamily='Times' variant="h4" textAlign="center">
                        {currId ? 'Updating' : 'Creating'} a Memory
                    </Typography>
                    <TextField 
                        name="title" 
                        autoComplete="se"
                        variant="outlined" 
                        label="title" 
                        fullWidth 
                        value={postData.title}
                        onChange={(e)=>setPostData({...postData,title:e.target.value})}
                    />
                    <TextField 
                        name="message" 
                        variant="outlined" 
                        label="message" 
                        fullWidth 
                        multiline
                        rows={3}
                        value={postData.message}
                        onChange={(e)=>setPostData({...postData,message:e.target.value})}
                    />
                    <TextField 
                        name="tags" 
                        variant="outlined" 
                        label="tags" 
                        fullWidth 
                        value={postData.tags}
                        onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}
                    />
                    <div>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64})=>setPostData({...postData,selectedFile:base64})}
                        />
                    </div>
                    <Button variant="contained" size="large" color="primary" type="submit" fullWidth>
                        {currId ? 'Update' : 'Submit'}
                    </Button>
                    <Button variant="contained" size="large" color="secondary" onClick={handleClr} fullWidth>
                        {currId ? 'Cancel' : 'Clear Form'}
                    </Button>
                </form>
            }
        </Paper>
    )
}

export default Form;