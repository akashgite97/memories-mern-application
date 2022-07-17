import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
  },
  paper: {
    padding: theme.spacing(2),
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginTop:theme.spacing(8)
  },
  form: {
    marginTop:theme.spacing(2),
    width: '100%',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    marginTop:10

  },
  avatar:{
   backgroundColor:theme.palette.secondary.main,
   margin:theme.spacing(1)
  }
}));