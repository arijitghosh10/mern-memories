import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    header:{
        textTransform:'capitalize',
        maxHeight:'2.25rem',
    },
    media:{
       aspectRatio: 1.4
    },
    content:{
        padding:'0.75rem',
        display:'flex',
        flexDirection:'column',
        rowGap:'0.8rem',
    },
    actions:{
        display:'flex',
        justifyContent:'space-between',
        
    },
}));