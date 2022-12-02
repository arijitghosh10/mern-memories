import React, { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/styles';
import useStyles, { theme } from './styles';
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import 'typeface-secular-one';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import decode from'jwt-decode';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Confirmation from "../Confirmation";

 const Navbar = () =>{
     const classes = useStyles();
     const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const location = useLocation();
     const [open, setOpen] = useState(false);
     const handleClickOpen = () => {
        setOpen(true);
     };
     const handleClose = () => {
        setOpen(false);
     };

     const logout = () =>{
        dispatch({ type:'LOGOUT' });
        navigate('/auth');
        setUser(null);
        setOpen(false)
     }
     useEffect(()=>{
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
          }
        setUser(JSON.parse(localStorage.getItem('profile')));
     },[location])
     return (
        <AppBar position="static" color="inherit">
            <div className={classes.appBar}>
                <ThemeProvider theme={theme}>
                    <Typography component={Link} to="/" className={classes.heading} fontFamily={theme.typography.fontFamily} variant="h3">MEMORIES</Typography>
                </ThemeProvider>
                <Toolbar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar onClick={()=> navigate(`/creators/${user?.result.name}`)} 
                                sx={{ background:`${user?.result.picture ? ' ' : 'red'}`,cursor:'pointer' }} 
                                alt={user?.result.name} src={user?.result?.picture}
                            >
                                {user?.result.name.charAt(0)}
                            </Avatar>
                            <Typography component={Link} to={`/creators/${user?.result.name}`} className={classes.userName} variant="h6">
                                {user?.result.name}
                            </Typography>
                            <Button variant="contained" className={classes.logout} onClick={handleClickOpen} color="secondary">
                                <span className={classes.btnText}>LOGOUT</span>
                                <PowerSettingsNewIcon fontSize="small" />
                            </Button>
                            <Confirmation 
                                titleText='Confirm Logout'
                                contentText='Once you logout you wont be able to create posts,like or comment on others posts'
                                open={open}
                                handleClose={handleClose}
                                clickHandler={logout}
                                actionText='Logout'
                            />
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </div>
        </AppBar>
     )
 }

 export default Navbar;