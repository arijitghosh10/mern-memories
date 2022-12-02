import { CircularProgress, Divider, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom'
import { getPost, getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import CommentSection from "./CommentSection";

const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);

    if (!post) return null;

    const openPost = (_id) => navigate(`/posts/${_id}`);

    if (isLoading) {
        return (
        <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
        </Paper>
        );
    }

    const recommendedPosts = posts?.filter(({ _id }) => _id !== post._id).slice(0,4);

    return (
        <Paper style={{ padding: '1.25rem', borderRadius: '1rem',marginTop:'1rem' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post?.title}</Typography>
                    <Typography gutterBottom variant="h6">
                        {post?.tags?.map((tag,idx) => (
                            <Link key={idx} to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                                {` #${tag} `}
                            </Link>
                        ))}
                    </Typography>
                    <Typography fontFamily='Times New Roman' gutterBottom variant="h6">
                        {post?.message}
                    </Typography>
                    <Typography textAlign='end' variant="h6">
                        <strong>Created by~ </strong> 
                        <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                            {` ${post.name}`}
                        </Link>
                    </Typography>
                    <Typography variant="body1">
                        {moment(post?.createdOn).fromNow()}
                    </Typography>
                    <Divider style={{ marginTop: '1.5rem' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
                </div>
            </div>
            <CommentSection post={post} />
            {recommendedPosts.length && (
                <div className={classes.section}>
                    <Typography gutterBottom variant="h5">You might also like:</Typography>
                    <Divider />
                    <div className={classes.recommendedPosts}>
                        {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                            <div key={_id} className={classes.recommendedPost} onClick={() => openPost(_id)} >
                                <Typography fontWeight='600' variant="h6">
                                    {title}
                                </Typography>
                                <Typography fontWeight='600' gutterBottom variant="subtitle2">
                                    {name}
                                </Typography>
                                <Typography gutterBottom variant="subtitle2">
                                    {message}
                                </Typography>
                                <Typography gutterBottom variant="subtitle1">
                                    Likes: {likes.length}
                                </Typography>
                                <img src={selectedFile} alt='postImage' width="200px" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Paper>
    );
}
export default PostDetails;