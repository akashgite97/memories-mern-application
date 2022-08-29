import { makeStyles, createStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#454545',
  },
  headerLeft:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "28px"
  },
  headerRight:{
    display:'flex',
    alignItems:'center',
    justifyContent:'space-around'
},
  image: {
    marginLeft: '15px',
  },
  toolBar:{
    display:'flex',
    justifyContent:'flex-end',
    width:'400px',
  },
  profile:{
    display:'flex',
    width:'400px',
    justifyContent:'space-around'
  },
  userName:{
    display:'flex',
    alignItems:'center'
  },
 a:{
  textDecoration:'none'
 }
}));
