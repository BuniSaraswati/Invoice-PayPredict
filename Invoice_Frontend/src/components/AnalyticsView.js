import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { DataContext } from "../context/Context";
import Analytics from "./Analytics";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { actions } from "../context/Reducer";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 450,
  bgcolor: "#314f64",
  borderRadius: "5px",
  boxShadow: 24,
  color: "white",
  p: 4,
};

export default function AnalyticsView() {
  const { state, dispatch } = React.useContext(DataContext);

  const [clear_date_from, setClearDateFrom] = React.useState('2019-10-17');
  const [clear_date_to, setClearDateTo] = React.useState('2022-10-17');
  const [due_date_from, setDueDateFrom] = React.useState('2019-10-17');
  const [due_date_to, setDueDateTo] = React.useState('2022-10-17');
  const [baseline_create_date_from, setBaselineCreateDateFrom] = React.useState('2019-10-17');
  const [baseline_create_date_to, setBaselineCreateDateTo] = React.useState('2022-10-17');
  const [invoice_currency, setInvoiceCurrency] = React.useState('');
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
  
    setOpen(false);
  };


  return (
    <div>
      <Button
        style={{ color: "white",width:'100%', borderRadius: 0 }}
        size="medium"
        onClick={handleOpen}
        fullWidth
      >
        ANALYTICS VIEW
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" component="h1" sx={{ marginBottom: "20px" }}>
            ANALYTICS VIEW
          </Typography>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "25ch",
                backgroundColor: "white",
                borderRadius: 2,
                textAlign: "center",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30px",
              }}
            >
              <Typography>Clear Date</Typography>
              <Typography>Due Date</Typography>
            </div>
            <div style={{ textAlign: "center" }}>
              <TextField
                type="date"
                id="outlined-basic"
                label="From*"
                variant="filled"
                name="clear_date_from"
                value={clear_date_from}
                onChange={(e)=>setClearDateFrom(e.target.value)}
              />
              <TextField
                type="date"
                id="outlined-basic"
                label="From*"
                variant="filled"
                name="due_date_from"
                value={due_date_from}
                onChange={(e)=>setDueDateFrom(e.target.value)}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "-10px" }}>
              <TextField
                type="date"
                id="outlined-basic"
                label="To*"
                variant="filled"
                name="clear_date_to"
                value={clear_date_to}
                onChange={(e)=>setClearDateTo(e.target.value)}
              />
              <TextField
                type="date"
                id="outlined-basic"
                label="To*"
                variant="filled"
                name="due_date_to"
                value={due_date_to}
                onChange={(e)=>setDueDateTo(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0 30px",
              }}
            >
              <Typography>Baseline Create Date</Typography>
              <Typography>Invoice Currency</Typography>
            </div>
            <div style={{paddingLeft:'20px',display:'flex', alignItems:'center' }}>
              <TextField
                type="date"
                id="outlined-basic"
                label="From *"
                variant="filled"
                name="baseline_create_date_from"
                value={baseline_create_date_from}
                onChange={(e)=>setBaselineCreateDateFrom(e.target.value)}
              />
              <FormControl style={{width:'45%', backgroundColor:'white', color:'black', textAlign:'left', marginLeft:'8px', borderRadius:'7px'}}>
                <InputLabel id="demo-simple-select-label">Invioce Currency*</InputLabel>
                <Select
                
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="invoice_currency"
                  value={invoice_currency}
                  label="Invoice Currency"
                  onChange={(e)=>setInvoiceCurrency(e.target.value)}
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="CAD">CAD</MenuItem>
                  
                </Select>
              </FormControl>
            </div>
            <div
              style={{
                textAlign: "left",
                paddingLeft: "20px",
                marginTop: "-10px",
              }}
            >
              <TextField
                type="date"
                id="outlined-basic"
                label="To*"
                variant="filled"
                name="baseline_create_date_to"
                value={baseline_create_date_to}
                onChange={(e)=>setBaselineCreateDateTo(e.target.value)}
              />
            </div>

            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              sx={{
                width: "90%",
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                marginTop: "20px",
              }}
              size="medium"
            >
              <Analytics inpData={{clear_date_from, clear_date_to,
              due_date_from, due_date_to, baseline_create_date_from, baseline_create_date_to, invoice_currency}} />
              <Button
                color="error"
                sx={{ flex: 1, backgroundColor: "red", borderTopLeftRadius:0, borderBottomLeftRadius:0 }}
                onClick={handleClose}
                
              >
                CANCEL
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
