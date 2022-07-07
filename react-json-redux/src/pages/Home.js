import React , { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from "react-redux";
import { deleteUser, loadUsers, getByUsers } from '../redux/action/action';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, useNavigate } from 'react-router-dom';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { loadCars } from '../redux/action/actionCar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { deleteCar, getByCars } from '../redux/action/actionCar';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  

function Home() {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    const { users } = useSelector(state => state.users);
    const { cars } = useSelector(state => state.cars);
    const { dropdowns } = useSelector(state => state.dropdowns);

    
    

    useEffect(() => {
      dispatch(loadUsers());
      dispatch(loadCars());
    }, []);


  

    const handleChange = (event) => {
      const id = event.target.value;
      dispatch(getByUsers(id));
      dispatch(getByCars(id));
    };

    const handleDelete = (id) => {
      if(window.confirm("Are you sure wanted to delete the user ?")) {
        dispatch(deleteUser(id));
      }
    }

    const handleDeleteCar = (id) => {
      if(window.confirm("Are you sure wanted to delete the car ?")) {
        dispatch(deleteCar(id));
      }
    }

    
    
    return (
      <div>

        <br />
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <FormControl sx={{ m: 2, minWidth: 150 }} size="small">
              <InputLabel id="demo-simple-select-autowidth-label">Username</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                // value={age}
                onChange={handleChange}
                autoWidth
                label="Username"
                
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem> */}
                {dropdowns.data && dropdowns.data.map((dropdown) => (
                <MenuItem key={dropdown.id} value={dropdown.id}>{dropdown.name}</MenuItem>
                ))}
              </Select>
              
            </FormControl>

        </div>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>

          <Link to="/addUser" style={{ textDecoration: 'none'}}>  
          <Button variant='contained' color = "primary">Add User</Button>
          </Link>


            
            
          </div>

        <br />
          <React.Fragment>
            <CssBaseline />
              <Container maxWidth="lg">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Email</StyledTableCell>
                        <StyledTableCell align="center">Contact</StyledTableCell>
                        <StyledTableCell align="center">Address</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {users.data && users.data.map((user) => (
                        <StyledTableRow key={user.id}>
                          <StyledTableCell component="th" scope="row" align="center">
                            {user.name}
                          </StyledTableCell>
                          <StyledTableCell align="center">{user.email}</StyledTableCell>
                          <StyledTableCell align="center">{user.contact}</StyledTableCell>
                          <StyledTableCell align="center">{user.address}</StyledTableCell>
                          <StyledTableCell align="center">

                            <ButtonGroup variant="contained" aria-label="contained primary button group">
                              <Button 
                              color = "error" 
                              style={{ marginRight: "5px" }}
                              onClick={() => handleDelete(user.id)}>
                                DEL</Button>
                              <Button color = "primary" onClick={() => navigate(`/editUser/${user.id}`)} >EDIT</Button>
                          </ButtonGroup>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
          </React.Fragment>
        

        <br /><br />


        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>

          <Link to="/addCar" style={{ textDecoration: 'none'}}>
          <Button variant='contained' color = "primary">Add Car</Button>
          </Link>

          </div>
          

        <br />

        <React.Fragment>
            <CssBaseline />
              <Container maxWidth="lg">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell align="center">CarName</StyledTableCell>
                        <StyledTableCell align="center">Brand</StyledTableCell>
                        <StyledTableCell align="center">Price</StyledTableCell>
                        <StyledTableCell align="center">RemainDebt</StyledTableCell>
                        {/* <StyledTableCell align="center">StudentId</StyledTableCell> */}
                        <StyledTableCell align="center">Action</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cars.data && cars.data.map((car) => (
                        <StyledTableRow key={car.id}>
                          <StyledTableCell component="th" scope="row" align="center">
                            {car.carName}
                          </StyledTableCell>
                          <StyledTableCell align="center">{car.brand}</StyledTableCell>
                          <StyledTableCell align="center">{car.price}</StyledTableCell>
                          <StyledTableCell align="center">{car.remainDebt}</StyledTableCell>
                          {/* <StyledTableCell align="center">{car.fK_StudentId}</StyledTableCell> */}
                          <StyledTableCell align="center">

                            <ButtonGroup variant="contained" aria-label="contained primary button group">
                              <Button 
                              color = "error" 
                              style={{ marginRight: "5px" }}
                              onClick={() => handleDeleteCar(car.id)}>
                                DEL</Button>
                              <Button color = "primary" onClick={() => navigate(`/editCar/${car.id}`)} >EDIT</Button>
                          </ButtonGroup>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Container>
          </React.Fragment>
        
        <br /><br />
      </div>
    );
  }

export default Home