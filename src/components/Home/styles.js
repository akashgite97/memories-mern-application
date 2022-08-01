import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  appSearchBar:{
    borderRadius:4,
    marginBottom:'1rem',
    display:'flex',
    padding:'16px'
  },
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
    position: "absolute",
    right: "3%",
},
image: {
    marginLeft: '15px',
},
pagination : {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "11px",
    marginTop: "10px"
  },
}));
