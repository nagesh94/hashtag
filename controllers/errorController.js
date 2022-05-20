exports.errorController=(err,req,res,next)=>{
    
    err.status=err.status || "failure"
    err.statusCode=err.statusCode || 500
 
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message,
        error:err,
        stack:err.stack
    })
 
    next();
    
 }