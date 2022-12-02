import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({ name,label,autoFocus,handleChange,type,handleShowPwd,half}) =>{
    return (
        <Grid item xs={12} md={half ? 6 : 12}>
            <TextField
                name={name}
                label={label}
                variant="outlined"
                fullWidth
                required
                autoFocus={autoFocus}
                onChange={handleChange}
                type={type}
                InputProps={name === "password" ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPwd}>
                                {type === 'password' ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input;