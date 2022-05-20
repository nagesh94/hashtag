import { Autocomplete, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchallUser, fetchUser } from '../common/redux/userSlice';
import axios from 'axios';

//styling the modal material ui

const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#81AFDD',
    border: '2px solid #000',
    boxShadow: 24,
    p: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "1rem",
    borderRadius: "10px"

};


//styling using material ui

const useStyles = makeStyles(() => ({

    card: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "2rem",

    },

    blueCard: {
        background: "#81AFDD",
        padding: "1rem",
        display: "flex",
        justifyContent: "flex-start",
        '&:hover': {
            transform: "scale(1.01)",
            cursor: "pointer"

        },

        width: "100%"

    },
    blackCard: {

        padding: "0.5rem",
        display: "flex",
        justifyContent: "flex-start",
        '&:hover': {
            transform: "scale(1.01)",
            cursor: "pointer"

        }
    }
}))


const Card = ({ detail, index, user }) => {


    const classes = useStyles()

    //modal state

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [forwrd, setForwrd] = useState(false)

    //dispatch and selector

    const dispatch = useDispatch()

    const allUser = useSelector(state => state.user.data2)

    //message that will be forwarded to backend 
    const [msg, setMsg] = useState({
        from: user.email,
        message: detail.message
    })


    //useEffect to get all user detail at the mounting phase (not a good practice , does it for demonstration purpose only)

    useEffect(() => {
        dispatch(fetchallUser())
    }, [])

    //to render a single user at home

    useEffect(() => {
        dispatch(fetchUser())
    }, [msg])


    //this will toggle the modal

    const forward = () => {
        setForwrd(!forwrd)
    }

    //forward message using axios

    const forwardMsg = async () => {
        try {
            const url = `http://localhost:8000/api/v1/users/`
            const token = localStorage.getItem('token')
            console.log(token)
            const response = await axios.patch(url, msg, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log(response)
            alert(`message has been sent to ${msg.to}`)
            setMsg({
                from: user.email,
                message: ""
            })
            handleClose()
        } catch (error) {
            console.log(error.response)
        }
    }
    return (
        <>
            <div className={classes.card}><MailOutlineIcon /><div onClick={handleOpen} className={index % 2 == 0 ? classes.blueCard : classes.blackCard}><Typography variant='h5'>message from {detail.from}</Typography></div>
            </div>

            {/*modal that will pop up when we open the message*/}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style1}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        FROM:{detail.from}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        TIME:{detail.time}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        MESSAGE:{detail.message}
                    </Typography>
                    <Button variant='contained' onClick={forward}>Forward </Button>
                    {forwrd ? <><Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={allUser.map(item => item.email)}
                        onChange={(event, value) => setMsg({ ...msg, to: value })}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="email" />}
                    /> <Button variant='contained' onClick={forwardMsg}>Send</Button></> : ""}
                </Box>
            </Modal>

        </>
    )
}

export default Card