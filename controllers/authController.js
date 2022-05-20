const jwt = require('jsonwebtoken')
const appError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const Users=require('./../modals/usersModal')


const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET,
        {
            expiresIn: process.env.TOKEN_EXPIRE
        })
}

exports.login = catchAsync(async (req, res, next) => {
   


    const { password, email } = req.body
    if (!email || !password) {
        return next(new appError("please provide email and password", 400))
    }

     const user = await Users.findOne({ email })

    if (!user || password!=user.password) {
        return next(new appError("email or password is incorrect", 400))
    }

    const token = createToken(user._id)

    res.status(200).json({
        token
    })
})





exports.protect = catchAsync(async (req, res, next) => {

    //is token provided
    if (!req.headers.authorization) {
        return next(new appError("token does not exist", 401))
    }

    const token = req.headers.authorization.split(' ')[1]

    //if token is correct

    const decoded = jwt.verify(token, process.env.SECRET)

    const user = await Users.findById(decoded.id)
    
    req.currentUser = user;
    

    next()
})