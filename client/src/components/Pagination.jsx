import React,{ useEffect } from "react";
import { Pagination,PaginationItem } from "@mui/material";
import useStyles from './styles';
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

const Paginate = ({ page }) =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const { totalPages } = useSelector((state)=>state.posts);

    useEffect(()=>{
        if(page) dispatch(getPosts(page));
    },[dispatch,page])

    if(totalPages === 0) return null;

    return (
        <Pagination
            sx={{ marginBlock:'1rem',paddingBlock:'0.5rem'}}
            classes={{ ul:classes.ul }}
            count={totalPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item)=>(
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />  
            )}
        />
    )
}

export default Paginate;