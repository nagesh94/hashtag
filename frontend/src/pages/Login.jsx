import { Button, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const useStyles=makeStyles(theme=>({
  login:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:"100vh",
    width:"100vw",
    flexDirection:"column",
    gap:"2rem",
    borderRadius:"10px",
    background:'linear-gradient(310deg, #FFA5FD 0%, #00A3FF 52%, #EE82EE 100%)'
  },
  input:{
    display:"flex",
    flexDirection:"column",
    gap:"1rem",
    padding:"5rem",
    justifyContent:"center",
    alignItems:"center",
    border:"solid gray 1px",
    borderRadius:"5px",
    boxShadow:"var(--box-shadow)",
    background:"white",
    ['@media (max-width:500px) ']:{
      padding:"1rem",
    
    }
    
  }
}))

const Login = () => {

  const classes=useStyles()
  const navigate=useNavigate()
  const [data,setData]=useState({
    email:'',
    password:''
  })

  const changeHandler=(event)=>{
    setData({...data,[event.target.name]:event.target.value})
  }

  const submitHandler=async ()=>{

    console.log("hello")
    try {
      const url='http://localhost:8000/api/v1/users/login/'
      const response=await axios.post(url,data)
      console.log(response)
      localStorage.setItem('token',response.data.token)
      navigate('/home')
      
    } catch (error) {
      console.log(error.response)
    }
    
  }

  return (
    <div className={classes.login}>
      
        <div className={classes.input} >
        <Typography variant='h4' >USER LOGIN</Typography>
      <TextField type='email' label="EMAIL" name='email' variant="filled" color="primary" focused required value={data.email} onChange={changeHandler}/>
      <TextField type='password' label="PASSWORD" name='password' variant="filled" autoComplete='on' color="primary" focused required value={data.password} onChange={changeHandler}/>
      <Button  variant="contained" color="primary" onClick={submitHandler}>login</Button>
     
      </div>

      
    </div>
    
    
  )
}

export default Login