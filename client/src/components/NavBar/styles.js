import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material";
export const theme = createTheme({
    typography: {
          fontFamily: [
              'Secular One',
              'Times',
              'Roboto'
          ].join(','),
          color: '#0ffa',
    },
});
export default makeStyles(()=>({
    appBar: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    heading: {
      color: '#1B2430',
      textDecoration: 'none',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '20em',
    },
    profile: {
      display: 'flex',
      justifyContent: 'space-around',
      width: '20em',
    },
    userName: {
      display: 'flex',
      alignItems: 'center',
      textDecoration:'none',
      color:'#000'
    },
    '@media(max-width: 750px)':{
        appBar:{
          flexDirection:'column',
        },
        toolbar:{
          justifyContent:'center'
        },
        profile:{
          justifyContent:'space-evenly',
          width:'100%',
        }
    },
    '@media(max-width: 360px)':{
        profile:{
          justifyContent:'center',
          gap:'0.5rem'
        },
        btnText:{
          display:'none'
        }
    }
}))