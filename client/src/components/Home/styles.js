import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    appBarSearch: {
        borderRadius: 6,
        marginTop: '1.5rem',
        padding: '1rem',
    },
    pagination: {
        borderRadius: 4,
        marginTop: '1rem',
        padding: '16px',
    },
    formContainer:{
        width:'90%'
    },
    '@media(max-width: 400px)':{
        formContainer:{
          width:'100%'
        },
    }
}));