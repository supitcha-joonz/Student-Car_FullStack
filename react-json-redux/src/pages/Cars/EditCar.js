import React, { useState , useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link , useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getSingleCar, updateCar } from '../../redux/action/actionCar';

const EditCar = () => {

let dispatch = useDispatch();
const navigate = useNavigate();
const { car } = useSelector(state => state.cars)
const { id } = useParams();
const [state, setState] = useState({});


useEffect(() => {
  dispatch(getSingleCar(id));
}, []);


useEffect(() => {
  if(id) {
    if (car.data) {
      setState({ ...car.data });
    }
  } else {
    setState({ ...state })
  }
}, [car]);

const { carName, brand, price, remainDebt, fK_StudentId } = state;



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
  if(!carName || !brand || !price || !remainDebt || !fK_StudentId ) {
    setError("Please input all input Field");
  } else {
    var dataCar = {
      "id": id,
      "carName": carName,
      "brand": brand,
      "price": price,
      "remainDebt": remainDebt,
      "fK_StudentId": fK_StudentId
    };
    dispatch(updateCar(dataCar, id));
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
          label="carName"  
          name="carName"
          value={carName || ""}  
          type="text" 
          onChange={handleInputChange} /><br />

        <TextField id="standard-basic" variant="standard" 
          label="brand" 
          name='brand'
          value={brand || ""}
          type="text" 
          onChange={handleInputChange}/><br />

        <TextField id="standard-basic" variant="standard" 
          label="price"  
          name="price"
          value={price || ""}  
          type="number" 
          onChange={handleInputChange} /><br />

        <TextField id="standard-basic" variant="standard" 
          label="remainDebt" 
          name='remainDebt'
          value={remainDebt || ""}
          type="number" 
          onChange={handleInputChange}/><br />

        <TextField id="standard-basic" variant="standard" 
          label="fK_StudentId"  
          name="fK_StudentId"
          value={fK_StudentId || ""}  
          type="number" 
          onChange={handleInputChange} /><br /><br />

        
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

export default EditCar
