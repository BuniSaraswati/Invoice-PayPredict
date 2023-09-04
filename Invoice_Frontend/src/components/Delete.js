import * as React from "react";
import axios from 'axios'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import '../App.css'
import { DataContext } from "../context/Context";
import { actions } from "../context/Reducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "#2a3e4c",
  borderRadius:'5px',
  boxShadow: 24,
  color: "white",
  p: 4,
};

export default function Delete() {
  const {state, dispatch} = React.useContext(DataContext)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () =>{
    try{
      await axios.delete(`http://localhost:8080/Project_HRC/servlet/com.crud.DataDeletion?sl_no=${state.selected}`)
      console.log("deleted")
      dispatch({type: actions.DELETE_DATA, payload : state.selected})
      handleClose()
    }
    catch(err){
      console.log(err)
      handleClose()
    }
  }
  return (
    <div>
      <Button style={{ color: "white" , borderTopLeftRadius : 0, borderBottomLeftRadius:0}} onClick={handleOpen} disabled={state.selected.length > 0 ? false : true} fullWidth>
        Delete
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" component="h1">
            Delete Records ?
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
                backgroundColor: "white",
                borderRadius: 2,
                textAlign:'center',
                
              },
            }}
            noValidate
            autoComplete="off"
          >
            
            <Typography variant="h5" component="h3" sx={{fontSize:'17px', marginTop:'20px'}}>
            Are you sure you want to delete these record[s]?
          </Typography>
            
            
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              sx={{'width':'100%', 'display':'flex', "justifyContent":'space-between','margin':'auto', 'marginTop':'20px'}}
            >
              <Button className="btn_hover" color="error" sx={{'flex':'.5','backgroundColor':'red',}} onClick={handleClose} >CANCEL</Button>
              <Button sx={{'flex':'.5'}} onClick={handleDelete}>DELETE</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
