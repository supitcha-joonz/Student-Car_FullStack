import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { addUser } from '../../redux/action/action';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

let dispatch = useDispatch();
const navigate = useNavigate();

const [state, setState] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
});

const { name, email, contact, address } = state;

const [error, setError] = useState("");

const handleInputChange = (e) => {
  let { name , value } = e.target;
  setState({ ...state, [name]: value});
};

const handelSubmit = (e) => {
  e.preventDefault();
  if(!name || !address || !email || !contact ) {
    setError("Please input all input Field");
  } else {
    dispatch(addUser(state));
    navigate("/");
    setError("");
  }
};

  return (

    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', marginTop: 120}}>
        
      <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1, width: '45ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handelSubmit}
        >
           


        <div>
            <h2>ADD USER</h2>
            {error && <h3 style={{color: "red"}}>{error}</h3>}
        </div>
        
        <TextField id="standard-basic" variant="standard" 
          label="Name"  
          name="name"
          value={name}  
          type="text" 
          onChange={handleInputChange} /><br />

        <TextField id="standard-basic" variant="standard" 
          label="email" 
          name='email'
          value={email}
          type="email" 
          onChange={handleInputChange}/><br />

        <TextField id="standard-basic" variant="standard" 
          label="contact" 
          name='contact'
          value={contact} 
          type="number" 
          onChange={handleInputChange}/><br />

        <TextField id="standard-basic" variant="standard" 
         label="address"
         name='address'
         value={address} 
         type="text" 
         onChange={handleInputChange} /><br />

        
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <div style={{display: 'flex',  justifyContent:'left', alignItems:'left', marginRight:"20px"}}>
                <Link to="/" style={{ textDecoration: 'none'}}>
                <Button variant='contained' color = "secondary">Go Back</Button>
                </Link>
            </div>
            <div style={{display: 'flex',  justifyContent:'right', alignItems:'right'}}>
            <Button style={{width: "100px"}} variant='contained' 
             color = "primary"
             type='submit' 
             onChange={handleInputChange}>Submit</Button>
            </div>
        </div>
      </Box>
    </div>
  )
}

export default AddUser
