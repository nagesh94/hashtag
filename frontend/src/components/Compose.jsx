import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, TextareaAutosize, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallUser, fetchUser } from '../common/redux/userSlice';
import axios from 'axios';

//styling using material ui

const style = {
    position: 'absolute',
    right: "30px",
    bottom: "10px",

    width: "20vw",
    
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    boxSizing: 'border-box'
};





const Compose = ({ user }) => {

    //setting states for the modal component fromm materila ui

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //fetching all User data from redux (not a good practice , does it for demonstration purpose only)

    const dispatch = useDispatch()

    const allUser = useSelector(state => state.user.data2)
  
    //message to be sent to the other user

    const [msg,setMsg]=useState({
        from:user.email,
        message:""
    })


    //useEffect to get all user detail at the mounting phase (not a good practice , does it for demonstration purpose only)

    useEffect(() => {
        dispatch(fetchallUser())
    }, [])

    //using dependancy to call  logged in User such thar home component will get rendered

    useEffect(() => {
        dispatch(fetchUser())
    }, [msg])

    //function to set message to be sent

    const changeHandler=(event)=>{
        setMsg({...msg,[event.target.name]:event.target.value})
    }


    //sending message to other user 
    
    const sendMsg=async ()=>{
         try {
      const url = `http://localhost:8000/api/v1/users/`
      const token = localStorage.getItem('token')
      console.log(token)
      const response = await axios.patch(url, msg, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })


      alert(`message has been sent to ${msg.to}`)
      setMsg({
        from:user.email,
        message:""
    })

    
    handleClose()
    } catch (error) {
      console.log(error.response)
    }
    }


    
    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="error">COMPOSE</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div><Typography >To:</Typography><Autocomplete 
                        disablePortal
                        id="to"
                        options={allUser.map(item=>item.email)}
                        onChange={(event,value)=>setMsg({...msg,to:value})}
                        
                        renderInput={(params) => <TextField    {...params}  />}
                    /></div>
                    <div><Typography>Message:</Typography><TextareaAutosize
                    name='message'
                        aria-label="empty textarea"
                       
                        onChange={changeHandler}
                        style={{ width: '70%',height:100 }}
                    /></div>

                    <Button variant="contained" color="success" onClick={sendMsg}>
                        SEND
                    </Button>

                </Box>
            </Modal>
        </div>
    )
}

export default Compose