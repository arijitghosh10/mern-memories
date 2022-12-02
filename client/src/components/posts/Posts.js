import React from "react";
import Post from "./post/Post";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@mui/material";
import useStyles from './styles';

const Posts= ({ setCurrId }) => {
    const classes = useStyles();
    const { posts,isLoading } = useSelector((state)=>state.posts);
    return (
        isLoading ? <CircularProgress size={50} sx={{ marginBlock:'1rem'}} /> : (
            <Grid className={classes.container} alignItems='stretch'>
                {
                    posts.map((post)=> (
                        <Grid item key={post._id} xs={12} sm={5.5} md={5} lg={3.75} >
                            <Post post={post} setCurrId={setCurrId} />
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts;