import { Alert, Avatar, Button, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from './styles';
import LockIcon from '@mui/icons-material/Lock';
import Input from "./Input";
import { GoogleLogin,GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch,useSelector } from "react-redux";
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { signin,signup } from '../../actions/auth';

const Auth = () =>{
    const classes = useStyles();
    const [isSignUp,setIsSignUp] = useState(false);
    const [showPwd,setShowPwd] = useState(false);
    const { errors,loading } = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const history = useNavigate();
    const clientId = '982476799290-5godd20fnsqkicrj0tumc7rj9e176c0l.apps.googleusercontent.com';
    const initialState = { firstName:'',lastName:'',email:'',password:'',confirmPassword:'' };
    const [formData,setFormData] = useState(initialState);
    const inputHandler = (e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(isSignUp) dispatch(signup(formData,history));
        else dispatch(signin(formData,history));
    }
    const handleShowPwd = () => setShowPwd((prevState)=> !prevState);
    const switchLogin = () => setIsSignUp((prevState) => !prevState);
    const googleSuccess = async (res) => {
        const token = res?.credential;
        const result = res.credential ? jwt_decode(res.credential) : undefined;
        try {
            dispatch({ type:'AUTH', data: {result,token}});
            history('/');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar sx={{background:'red'}} className={classes.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label='FirstName' handleChange={inputHandler} half autoFocus />
                                    <Input name='lastName' label='LastName' handleChange={inputHandler} half/>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" autoFocus type='email' handleChange={inputHandler} />
                        <Input name="password" label="Password" type={showPwd ? 'text' : 'password'} handleChange={inputHandler} handleShowPwd={handleShowPwd} />
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={inputHandler} type="password" />}
                    </Grid>
                    {errors && <Alert sx={{ marginTop:'0.5rem'}} severity="error">
                            {errors}
                        </Alert>
                    }
                    <Button sx={{marginBlock:'1rem 0.5rem'}} type="submit" fullWidth variant="contained" color="primary">
                        Sign{isSignUp ? `${loading ? 'ing' : ''} Up` : `${loading ? 'ing' : ''} In`} 
                        {loading && <CircularProgress size={20} sx={{ marginLeft:'0.75rem',color:'#fff'}} />}
                    </Button>
                    <Typography sx={{ fontWeight:'600' }} variant="h6" textAlign='center'>OR</Typography>
                    <GoogleOAuthProvider clientId={clientId}>
                        <Button fullWidth>
                            <GoogleLogin
                                size={window.innerWidth > '350' ? 'large' : 'medium'}
                                useOneTap
                                theme="filled_blue"
                                onSuccess={googleSuccess}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </Button>
                    </GoogleOAuthProvider>
                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchLogin}>
                                {isSignUp ? 'Alrady have an Account? Sign In' : 'Dont have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}
export default Auth;