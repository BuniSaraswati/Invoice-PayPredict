import  React ,{useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataContext } from "../context/Context";
import { actions } from "../context/Reducer";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#314f64",
  borderRadius: "5px",
  boxShadow: 24,
  color: "white",
  p: 4,
};

export default function AdvanceSearch() {

  const {state, dispatch} =  React.useContext(DataContext)
  
  const inpData = {
    doc_id:"",
    invoice_id:"",
    buisness_year:"",
    cust_number:""
  }
  
  const [inp, setInp] = useState(inpData);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setInp(inpData)
    setOpen(false);
  };

  const handleChange=(e)=>{
    setInp({...inp,
    [e.target.name] : e.target.value})
  }

  const handleSearch=()=>{
    if(!Object.values(inp).includes("")){

      dispatch({type : actions.DO_ADVANCE_SEARCH, payload : inp})
      handleClose()
    }else{
      alert("All fields should be filled")
    }
  }
  return (
    <div>
      <Button style={{ color: "white", borderTopLeftRadius : 0 , borderBottomLeftRadius : 0}} size="medium" onClick={handleOpen} fullWidth>
        ADVANCE SEARCH
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" component="h1" sx={{ marginBottom:'20px'}}>
            ADVANCE SEARCH
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
                backgroundColor: "white",
                borderRadius: 2,
                textAlign:'center'
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{textAlign:'center'}}>
              <TextField
                id="outlined-basic"
                label="Document Id"
                variant="filled"
                name="doc_id"
                value={inp.doc_id}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Invoice Id"
                variant="filled"
                name="invoice_id"
                value={inp.invoice_id}
                onChange={handleChange}
              />
            </div>
            <div style={{textAlign:'center'}}>
              <TextField
                id="outlined-basic"
                label="Customer Number"
                variant="filled"
                name="cust_number"
                value={inp.cust_number}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                label="Business Year"
                variant="filled"
                name="buisness_year"
                value={inp.buisness_year}
                onChange={handleChange}
              />
            </div>
            
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              sx={{'width':'90%', 'display':'flex', "justifyContent":'space-between','margin':'auto', 'marginTop':'20px'}}
            >
              <Button sx={{'flex':'.5'}} onClick={handleSearch}>SEARCH</Button>
              <Button color="error" sx={{'flex':'.5','backgroundColor':'red',}} onClick={handleClose} >CANCEL</Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
