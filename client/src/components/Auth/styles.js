import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    marginTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0.5rem',
  },
  root: {
    '& .MuiTextField-root': {
      margin: '0.5rem',
    },
  },
  avatar: {
    margin: '0.2rem',
  },
  form: {
    width: '100%', 
    marginTop: '1rem',
  },
}));