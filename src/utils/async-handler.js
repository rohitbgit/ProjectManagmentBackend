const asyncHandler= (requestHandler)=>{
    return (req,res,next)=>{
        // Represents the completion of an asynchronous operation
        Promise
        .resolve(requestHandler(req,res,next))
        .catch((error)=> next(error))
    }
}
export {asyncHandler};