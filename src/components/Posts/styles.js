import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    borderRadius: 15,
    //margin: '30px 0px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap:'wrap',
    padding: '0px 50px',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  marginLeft:{
marginLeft:'14px'
  },
  actionDiv: {
    textAlign: 'center',
  },
  alignCenter:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  }
}));
