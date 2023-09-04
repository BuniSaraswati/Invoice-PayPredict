import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { actions } from "../context/Reducer";
import { DataContext } from "../context/Context";
import Grid from "@mui/material/Grid";



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 950,
  bgcolor: "#2a3e4c",
  borderRadius: "5px",
  boxShadow: 24,
  color: "white",
  p: 4,
};

export default function BasicModal() {
  const { state, dispatch } = React.useContext(DataContext);
  const data = {
    total_open_amount: "",
    cust_number: "",
    baseline_create_date: "2000-10-17",
    business_code: "",
    clear_date: "2000-10-17",
    posting_id: "",
    doc_id: "",
    cust_payment_terms: "",
    buisness_year: new Date().getFullYear(),
    invoice_id: "",
    document_create_date: "2000-10-17",
    posting_date: "2000-10-17",
    invoice_currency: "",
    due_in_date: "2000-10-17",
    document_type: "",
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInput(data);
  };

  const [input, setInput] = React.useState(data);

  const handleAdd = () => {
    
    if (! Object.values(input).includes("")) {
      Axios.post("http://localhost:8080/Project_HRC/DataInsertion", null, {
        params: input,
      })
        .then((res) => {
          if(res.status==200){
            dispatch({ type: actions.INSERT_DATA, payload: input });
            handleClose();
          }else{
            alert("Cannot insert data to datbase")
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("All fields should be filled");
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Button
        style={{
          color: "white",
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
        }}
        onClick={handleOpen}
        fullWidth
      >
        Add
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" component="h1" sx={{ marginBottom: "20px" }}>
            ADD
          </Typography>
          <Grid container spacing={1}>
          <Grid container item spacing={3}>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Business Code*"
                name="business_code"
                value={input.business_code}
                onChange={handleChange}
                variant="filled"
                sx={{ background: "white", borderRadius: "5px" }}
                inputProps={{ maxLength: 10 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Customer Number*"
                variant="filled"
                name="cust_number"
                value={input.cust_number}
                onChange={handleChange}
                sx={{ background: "white", borderRadius: "5px" }}
                type="number"
                fullWidth
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Clear Date*"
                variant="filled"
                name="clear_date"
                value={input.clear_date}
                onChange={handleChange}
                type="date"
                sx={{ background: "white", borderRadius: "5px" }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Business Year*"
                variant="filled"
                name="buisness_year"
                value={input.buisness_year}
                onChange={handleChange}
                sx={{ background: "white", borderRadius: "5px" }}
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Document Id*"
                variant="filled"
                name="doc_id"
                value={input.doc_id}
                onChange={handleChange}
                sx={{ background: "white", borderRadius: "5px" }}
                inputProps={{ maxLength: 10 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Posting Date*"
                variant="filled"
                name="posting_date"
                value={input.posting_date}
                onChange={handleChange}
                type="date"
                sx={{ background: "white", borderRadius: "5px" }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Document Create Date*"
                variant="filled"
                name="document_create_date"
                value={input.document_create_date}
                onChange={handleChange}
                type="date"
                sx={{ background: "white", borderRadius: "5px" }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Due Date*"
                variant="filled"
                name="due_in_date"
                value={input.due_in_date}
                onChange={handleChange}
                type="date"
                sx={{ background: "white", borderRadius: "5px" }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={3}>
              <FormControl
                variant="filled"
                sx={{ background: "white", borderRadius: "5px" }}
                fullWidth
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Invoice Currency*
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={input.invoice_currency}
                  onChange={handleChange}
                  name="invoice_currency"
                >
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="CAD">CAD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Document Type*"
                variant="filled"
                name="document_type"
                value={input.document_type}
                onChange={handleChange}
                sx={{ background: "white", borderRadius: "5px" }}
                inputProps={{ maxLength: 5 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Posting Id*"
                variant="filled"
                name="posting_id"
                value={input.posting_id}
                onChange={handleChange}
                sx={{ background: "white", borderRadius: "5px" }}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Total Open Amount*"
                variant="filled"
                name="total_open_amount"
                value={input.total_open_amount}
                onChange={handleChange}
                sx={{ background: "white", borderRadius: "5px" }}
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item spacing={3}>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Baseline Create Date*"
                variant="filled"
                name="baseline_create_date"
                value={input.baseline_create_date}
                onChange={handleChange}
                type="date"
                sx={{ background: "white", borderRadius: "5px" }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Customer Payment Terms*"
                variant="filled"
                name="cust_payment_terms"
                value={input.cust_payment_terms}
                onChange={handleChange}
                sx={{ background: "white", borderRadius: "5px" }}
                inputProps={{ maxLength: 5 }}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="outlined-basic"
                label="Invoice Id*"
                variant="filled"
                name="invoice_id"
                value={input.invoice_id}
                onChange={handleChange}
                sx={{ background: "white", borderRadius: "5px" }}
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container item spacing={0} style={{ display: "flex" }}>
            <Grid item xs={6} style={{ flex: 0.5 }}>
              <Button
                variant="outlined"
                style={{ width: "100%",backgroundColor:'#1976d2', color: "white", borderColor: "white" , borderTopRightRadius : 0, borderBottomRightRadius:0}}
                onClick={handleAdd}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={6} style={{ flex: 0.5 }}>
              <Button
                variant="outlined"
                style={{ width: "100%",backgroundColor:'red', color: "white", borderColor: "white", borderTopLeftRadius:0, borderBottomLeftRadius:0 }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
        </Box>
      </Modal>
    </div>
  );
}
