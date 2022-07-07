import React, { useState , useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link , useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {  getSingleUser, updateUser } from '../../redux/action/action';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {

let dispatch = useDispatch();
const navigate = useNavigate();
const { user } = useSelector(state => state.users)
const { studentId } = useParams();
const [state, setState] = useState({});


useEffect(() => {
  dispatch(getSingleUser(studentId));
}, []);


useEffect(() => {
  if(studentId) {
    if (user.data) {
      setState({ ...user.data });
      // console.log(user.data);
    }
  } else {
    setState({ ...state })
  }
}, [user]);

const { name, email, contact, address } = state;



const [error, setError] = useState("");

const handleInputChange = (e) => {
  let { name , value } = e.target;
  // if (name = "name") {
  //   setState({ 
  //     ...setState, 
  //     name: value
  //   })
  // }
  setState({ ...state, [name]: value});
};

const handelSubmit = (e) => {
  e.preventDefault();
  if(!name || !address || !email || !contact ) {
    setError("Please input all input Field");
  } else {
    var data = {
      "id": studentId,
      "name": name,
      "address": address,
      "email": email,
      "contact": contact
    };
    dispatch(updateUser(data, studentId));
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
            <h2>Edit USER</h2>
            {error && <h3 style={{color: "red"}}>{error}</h3>}
        </div>
      
        
        <TextField id="standard-basic" variant="standard" 
          label="Name"  
          name="name"
          value={name || ""} 
          type="text" 
          onChange={handleInputChange} /><br />

        <TextField id="standard-basic" variant="standard" 
          label="email" 
          name='email'
          value={email || ""}
          type="email" 
          onChange={handleInputChange}/><br />

        <TextField id="standard-basic" variant="standard" 
          label="contact" 
          name='contact'
          value={contact || ""} 
          type="number" 
          onChange={handleInputChange}/><br />

        <TextField id="standard-basic" variant="standard" 
         label="address"
         name='address'
         value={address || ""} 
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
             onChange={handleInputChange}>Update</Button>
            </div>
        </div>
      </Box>
    </div>
  )
}

export default EditUser
