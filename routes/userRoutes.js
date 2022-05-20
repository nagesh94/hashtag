const express=require('express')
const userController=require('./../controllers/userController')
const authController=require('./../controllers/authController')

const router=express.Router()

router
.route('/login')
.post(authController.login)

router
.route('/loggeduser')
.get(authController.protect,userController.getloggedUser)

router
.route('/')
.get(userController.getAlluser)
.post(userController.createUser)
.patch(authController.protect,userController.updateUser)


router
.route('/:id')
.get(authController.protect,userController.getUser)
.patch(authController.protect,userController.updateUserbyId)




module.exports=router