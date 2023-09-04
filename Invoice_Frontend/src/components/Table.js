import React, { useContext } from "react";
import axios from "axios";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { visuallyHidden } from '@mui/utils';
import TableSortLabel from '@mui/material/TableSortLabel';
import { headCells } from "./temp";
import { DataContext } from "../context/Context";
import { actions } from "../context/Reducer";
import '../App.css'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  }
  
  return (
    <TableHead style={{ backgroundColor: "#283d4a" }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            style={{ color: "white" }}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
      
        {headCells.map((headCell,index) => (
          
          <TableCell

            key={headCell.id}
            sx={{color:'white'}}
            className="head"
            align='center'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{color:'white'}}
              className="head"
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}


EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const {state, dispatch } = useContext(DataContext);

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("sl_no");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = state.myData.map((n) => n.sl_no);
      dispatch({type : actions.SET_SELECTED, payload : newSelecteds})
      return;
    }
    dispatch({type : actions.SET_SELECTED, payload : []})
  };

  const handleClick = (event, sl_no) => {
    const selectedIndex = state.selected.indexOf(sl_no);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(state.selected, sl_no);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(state.selected.slice(1));
    } else if (selectedIndex === state.selected.length - 1) {
      newSelected = newSelected.concat(state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        state.selected.slice(0, selectedIndex),
        state.selected.slice(selectedIndex + 1)
      );
    }
    dispatch({type : actions.SET_SELECTED, payload : newSelected})
    console.log(state.selected)
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (sl_no) => state.selected.indexOf(sl_no) !== -1;

  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/Project_HRC/DataFetching"
      );
      return response.data.list;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(async() => {

    const payload = await getData();
    dispatch({ type: actions.GET_DATA, payload: payload })
    
  }, []);
  return (
    <Box sx={{ width: "100%", color: "white" }}>
      <Paper sx={{ width: "100%", mb: 0 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750, backgroundColor: "#2d4250", color: "white" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={state.selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={state.isSearch ? state.searchData.length : state.myData.length}
            />
            <TableBody>
              {stableSort(state.isSearch ? state.searchData : state.myData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((data, index) => {
                  
                  const isItemSelected = isSelected(data.sl_no);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, data.sl_no)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={data.sl_no}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          style={{ color: "white" }}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        style={{ color: "white" }}
                      >
                        {data.sl_no}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.business_code}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.cust_number}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="right" padding="none" sx={{minWidth:'80px', padding: '0 20px'}}>
                        {data.clear_date}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.buisness_year}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.doc_id}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center" padding="none" width='7%'>
                        {data.posting_date}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center" padding="none" width='7%'>
                        {data.document_create_date}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center" padding="none" sx={{minWidth:'80px', padding: '0 20px'}}>
                        {data.due_in_date}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.invoice_currency}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.document_type}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center" padding="none" >
                        {data.posting_id}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.total_open_amount}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center" padding="none" width='7%'>
                        {data.baseline_create_date}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.cust_payment_terms}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.invoice_id}
                      </TableCell>
                      <TableCell style={{ color: "white" }} align="center">
                        {data.aging_bucket}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ backgroundColor: "#283d4a", color: "white" }}
          rowsPerPageOptions={[10, 15, 20]}
          component="div"
          count={state.isSearch ? state.searchData.length : state.myData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
