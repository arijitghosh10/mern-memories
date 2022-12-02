import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  media: {
    borderRadius: '1.1rem',
    objectFit: 'cover',
    width: '100%',
    maxWidth:'35rem',
    aspectRatio:1.5
  },
  card: {
    display: 'flex',
    width: '100%',
  },
  section: {
    borderRadius: '1.25rem',
    margin: '1rem',
    flex: 1,
  },
  imageSection: {
    marginLeft: '1rem',
    maxWidth:'30rem'
  },
  recommendedPosts: {
    display: 'flex',
    gap:'1rem'
  },
  recommendedPost:{
    margin: '1rem 0.25rem', 
    cursor: 'pointer',
    maxWidth:'43%'
  },
  loadingPaper: {
    margin:'1rem',display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  outerContainer:{
    display:'flex',
    justifyContent:'space-evenly',
  },
  innerContainer:{
    height:'12rem',
    overflowY:'auto',
    marginRight:'2rem',
    "&::-webkit-scrollbar":{
      width: 4,
      scrollBehavior: 'smooth',
    },
    "&::-webkit-scrollbar-thumb":{
      backgroundColor: '#c4c4c4',
      borderRadius: 10 
    },
    "&::-webkit-scrollbar-track":{
      backgroundColor: '#fff'
    },
  },
  comment:{
    width:'60%'
  },
  '@media(max-width: 1200px)':{
    recommendedPosts:{
      flexWrap:'wrap',
    }
  },
  '@media(max-width: 750px)':{
    recommendedPost:{
      maxWidth:'100%',
    }
  },
  '@media(max-width: 1100px)':{
    imageSection:{
      width:'40%'
    }
  },
  '@media(max-width: 820px)':{
    card:{
      flexDirection:'column'
    },
    imageSection:{
      width:'80%',
      margin:'auto'
    },
    outerContainer:{
      flexDirection:'column-reverse'
    },
    comment:{
      width:'90%'
    }
  }
}));