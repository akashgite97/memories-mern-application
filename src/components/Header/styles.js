import { makeStyles } from '@material-ui/core/styles';

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
    color: 'rgba(0,183,255, 1)',
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
    width:'400px'
  },
  userName:{
    display:'flex',
    alignItems:'center'
  },
 
}));
