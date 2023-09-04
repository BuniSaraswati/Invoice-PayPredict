import React,{useContext} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ChartView from './Chart'
import { DataContext } from '../context/Context';
import { actions } from '../context/Reducer';
import { PieChart } from './PieChart';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const {state, dispatch} = useContext(DataContext)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAnalytics=()=>{

    if( Object.values(props.inpData).includes("")){
      alert("Please fill all the fields")
    }else{
      handleClickOpen()
      dispatch({type:actions.GET_ANALYTICS, payload : props.inpData})

    }
  }

  return (
    <div>
    
      <Button variant="outlined" color="primary" onClick={handleAnalytics} 
      sx={{ color:'white', backgroundColor:'#1976d2', width:'220px', borderTopRightRadius:0, borderBottomRightRadius:0}}
       size="medium" fullWidth >
        ANALYTICS VIEW
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Analytics View
            </Typography>
            
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button style={{width:'70%', margin:'0 auto'}}>
            <ChartView/>
          </ListItem>
          <Divider />
          <ListItem>
            <Typography variant="h5" style={{margin:'auto'}}>Total number of Customers vs Business</Typography>
          </ListItem>
         
          <ListItem button style={{width:'50%', margin:'0 auto'}}>
            <PieChart/>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
