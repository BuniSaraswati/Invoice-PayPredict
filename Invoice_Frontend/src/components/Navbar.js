import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import logo from '../img/logo.png'
import abc_logo from '../img/abc_products.png'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  abRoot: {
    backgroundColor: "#2d4250",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  return ( 
    <AppBar position="static"
    classes={{ 
    root: classes.abRoot
  }}>
      <Toolbar style={{display:'flex'}}>
        <IconButton
          edge="start"
          style={{flex:.15,borderRadius: 0, textAlign:'left'}}
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
          
        >
          <img src={abc_logo} alt="abc _logo" style={{'height':'30px'}}/>
        </IconButton>
        
        <IconButton
          edge="start"
          style={{flex:.7, borderRadius: 0,textAlign:'left'}}
          color="inherit"
          aria-label="menu"
         
        >
          <img src={logo} alt="hrc_logo" style={{height:'40px'}}/>
          </IconButton>
   
      </Toolbar>
    </AppBar>
    
  );
};

export default Navbar