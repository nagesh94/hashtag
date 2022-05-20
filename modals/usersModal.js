const mongoose = require('mongoose')





const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstname is required"]
    },
    lastName: {
        type: String,
        required: [true, "lastname is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password please"]
    },

    recivedMsg:[
        {
            from: {
                type: String,
        
            },
            time: {
                type: Date,
                default:Date.now()
                
            },
            message: {
                type: String
            }
        }
    ]
    ,

    sentMsg:[
        {
            to: {
                type: String,
        
            },
            time: {
                type: Date,
                default:Date.now()
            },
            message: {
                type: String
            }
        }
    ]

})

userSchema.methods.updateReceivedMsg=function(body){
 
   
    this.recivedMsg=[...this.recivedMsg,body]
}
userSchema.methods.updateSentMsg=function(body){
  
    
    this.sentMsg=[...this.sentMsg,body]
}

module.exports= mongoose.model('users',userSchema)