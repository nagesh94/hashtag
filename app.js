const express =require('express')
const app = express()
const cors=require('cors')

const userRoute=require('./routes/userRoutes')



const errorController=require('./controllers/errorController')
const appError = require('./utils/appError')


//
app.use(cors({
    origin:"http://localhost:3000"
}))

//inbuilt middleware

app.use(express.json())

//route middlewares

app.use('/api/v1/users',userRoute)



//unhandled routes
app.all("*",(req,res,next)=>{
    
    
    next(new appError("this route does not exist",404))
}) 
    
//error handling middleware
app.use(errorController.errorController)

module.exports=app;