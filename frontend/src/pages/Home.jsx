import { Button, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUser } from '../common/redux/userSlice'
import Card from '../components/Card'
import Compose from '../components/Compose'

//styling using material ui

const useStyles = makeStyles(() => ({

    container: {
        background: 'linear-gradient(310deg, #FFA5FD 0%, #00A3FF 52%, #EE82EE 100%)',
        position:"relative"

    },
    home: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box",
        gap: "2rem",
        height: "90vh",
        
    },
    welcome: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },

    inbox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        border:"solid black 2px",
        padding:"2rem",
        boxShadow:"var(--box-shadow)",
        background:"white"
    },
    messages: {
        border: "solid black 1px"
    },
    logout:{
        position:"fixed",
        top:"10px",
       left:"1rem",
    }
}))

const Home = () => {

    const classes = useStyles()
    const navigate=useNavigate()
    const dispatch = useDispatch()

    //fetching loogged in user from the redux store

    const user = useSelector(state => state.user.data)
    
    //useEffect to call the fetchUser from slice at the mounting phase 

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    //logout functionality  

    const logout=()=>{
        localStorage.removeItem('token');
        navigate('/')
    }


    return (
        <div className={classes.container}>



            <Button variant='contained' className={classes.logout} onClick={logout}>Logout</Button>
            {user.firstName ? <div className={classes.welcome}> 
            
            <Typography variant='h2'>WELCOME {user.firstName}</Typography>

                <div className={classes.home}>
                    <Compose user={user} />

                    <div className={classes.inbox}>
                        <Typography variant='h4'>INBOX</Typography>

                        {
                            user.recivedMsg.map((item, index) => {
                                return <Card user={user} key={index} index={index} detail={item} />
                            })
                        }


                    </div>
                </div>
            </div> : ""}
        </div>
    )
}

export default Home