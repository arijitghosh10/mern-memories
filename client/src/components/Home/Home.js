import React, { useState } from "react";
import Posts from '../posts/Posts';
import Form from '../form/Form';
import { Grid,Grow, Paper, AppBar, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../actions/posts";
import Paginate from "../Pagination";
import { useNavigate,useLocation } from "react-router-dom";
import useStyles from './styles';
import ChipInput from 'material-ui-chip-input';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';

function useQuery(){
    return new URLSearchParams(useLocation().search);
}
const Home = () =>{
    const [currId,setCurrId] = useState(null);
    const [searchVal,setSearchVal] = useState('');
    const [tags,setTags] = useState([]);
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const navigate = useNavigate();

    const searchPosts = () =>{
        if(searchVal.trim()==='' && tags.length===0){
            navigate('/')
        }else{
            dispatch(getPostsBySearch({search:searchVal,tags:tags.join(',') }));
            navigate(`/posts/search?searchQuery=${searchVal || 'none'}&tags=${tags.join(',') }`);
        }
    }
    const handleKeyPress = (e)=>{
        if(e.keyCode === '13'){
            searchPosts();
            setSearchVal('')
        }
    }
    const handleAddChip= (tag) => setTags([...tags, tag]);
    const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag,) => tag !== chipToDelete));
    const dispatch = useDispatch();

    return (
        <Grow in>
            <Grid 
                sx={{ "@media (max-width: 900px)": { flexDirection:'column-reverse',alignItems:'center'},}} 
                container spacing={2}
            >
                <Grid item xs={12} sm={12} md={8.5} >
                    <Posts setCurrId={setCurrId} />
                </Grid>
                <Grid className={classes.formContainer} item xs={12} sm={10} md={3.5}>
                    <AppBar className={classes.appBarSearch} position='static' color="inherit">
                        <TextField
                            name="searchPosts"
                            variant="outlined"
                            label="Search posts by name"
                            fullWidth
                            onKeyPress={handleKeyPress}
                            value={searchVal}
                            onChange={(e)=>{setSearchVal(e.target.value)}}
                        />
                        <ChipInput
                            style={{ marginBlock: '0.75rem' }}
                            placeholder={tags.length>0 ? 'Add more tags' : ''}
                            alwaysShowPlaceholder
                            value={tags}
                            onAdd={(chip) => handleAddChip(chip)}
                            onDelete={(chip) => handleDeleteChip(chip)}
                            label="Search by Tags"
                            variant="outlined"
                        />
                        <Button endIcon={<ImageSearchIcon />} onClick={searchPosts} variant="contained">Search</Button>
                    </AppBar>
                    <Form currId={currId} setCurrId={setCurrId} />
                    {(!searchQuery && !tags.length) && (
                        <Paper elevation={6}>
                            <Paginate page={page} />
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Grow>
    )
}

export default Home;