import React, { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography, CircularProgress, Grid, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import Post from '../posts/post/Post';

const CreatorOrTag = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const { posts, isLoading } = useSelector((state) => state.posts);
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('profile'));
    const username = user?.result?.name;

    useEffect(() => {
        if (location.pathname.startsWith('/tags')) {
            dispatch(getPostsBySearch({ tags: name }));
        } else {
            dispatch(getPostsByCreator(name));
        }
    }, []);

    if (!posts.length && !isLoading) return (
        <Typography variant='h3' textAlign='center' marginTop='1rem'>
            No posts created by {username === name ? 'you' : username}
        </Typography>
        );

    const isTag = location.pathname.startsWith('/tags');
    const profilePostsHeading = <Typography variant='h4'>
            Posts {isTag ? 'for #' : 'by '}
            <span style={{ color:'#4c0274',fontSize:'2.5rem',fontWeight:`${isTag ? '' : '600'}`,
                fontFamily:'serif',fontStyle:`${isTag ? 'oblique' : ''}` }}
            >
                {name}
            </span>
        </Typography>;
    
    return (
        <div>
            <Typography sx={{ marginBlock:'1rem',textAlign:'center',fontFamily:'revert' }} variant="h3">
                {username === name ? 'My Posts' :profilePostsHeading}
            </Typography>
            <Divider style={{ marginBottom: '1rem' }} />
            {isLoading ? <CircularProgress /> : (
                <Grid container alignItems="stretch" spacing={3}>
                    {posts?.map((post) => (
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                            <Post post={post} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default CreatorOrTag;