import React, { useState,useContext } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Add from "./Add";
import Edit from "./Edit";
import Delete from "./Delete";
import AdvanceSearch from "./AdvanceSearch";
import { DataContext } from "../context/Context";
import { actions } from "../context/Reducer";
import { IconButton } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import '../App.css'
import axios from "axios";
import AnalyticsView from "./AnalyticsView";



const FunButtons = () => {

  const {state, dispatch} = useContext(DataContext)
  const [query, setQuery] = useState("")

  const Search=()=>{
    if(query == undefined){
      alert("Please enter a valid entry")
      dispatch({type: actions.SET_IS_SEARCH, payload: false})
      return
    }
    dispatch({type: actions.DO_SEARCH, payload : query})
  }

  const predict = async()=>{
    try{
      const row1 = state.myData.filter((row)=>row.sl_no == state.selected[0])[0]
      console.log(row1)
      const inputData ={
        sl_no : state.selected[0],
        flag : 0
      }
      const res = await axios.post("http://localhost:5000/",row1);
      dispatch({type:actions.SET_AGING_BUCKET, payload:{sl_no:state.selected[0], ag_bucket : res.data[0].aging_bucket}})
      inputData.aging_bucket = res.data[0].aging_bucket;
      const front_res = await axios.post(
        "http://localhost:8080/project_hrc/UpdateData",null,
        {params: inputData,}
      );
      console.log(res)
    }
    catch(err){
      console.log(err)
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        backgroundColor: "#283d4a",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        size="medium"
        className="btnGrp1"
      >
        <Button style={{ color: "white",backgroundColor:"#1976d2", flex: .4,borderTopRightRadius : 0 , borderBottomRightRadius : 0 }} variant="contained" size="medium" disabled={state.selected.length > 0 ? false : true}
        onClick={predict}>Predict</Button>
        {/* <Button style={{ color: "white", flex : .4 ,borderTopRightRadius : 0 , borderBottomRightRadius : 0}} size="medium">Analytics View</Button> */}
        <AnalyticsView/>
        
        <AdvanceSearch/>
      </ButtonGroup>
      <IconButton aria-label="delete" size="medium" onClick={()=>dispatch({type:actions.REFRESH,payload:false})}>
        <RefreshIcon sx={{color:'white',marginRight:'20px',border:'1px solid #06A4F5',padding:'5px',borderRadius:'4px'}} />
      </IconButton>
      <div className="inputNrefresh">
      <TextField
        id="outlined-basic"
        label="Search Customer Id"
        variant="filled"
        size="small"
        value={query}
        onChange={(e)=>setQuery(e.target.value)}
        style={{
          color: "white",
          margin: "auto 0",
          backgroundColor: "white",
          borderRadius: "5px",
          flex:.85
        }}
        onKeyUp={(e)=>{
          if(e.key=="Enter") Search()}
        }
      />
      {/* <IconButton aria-label="delete" size="medium" onClick={()=>dispatch({type:actions.REFRESH,payload:false})}>
        <RefreshIcon sx={{color:'white'}} />
      </IconButton> */}
      </div>
      <ButtonGroup variant="outlined" aria-label="outlined button group" className="btnGrp2">
        <Add />
        <Edit />
        <Delete/>
      </ButtonGroup>
    </Box>
  );
};

export default FunButtons;
