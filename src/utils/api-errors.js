class ApiErrors{
    constructor(statusCode, message, errors = [], stack=""){
        // super(message),
        this.statusCode= statusCode,
        this.message = message,
        this.data =null,
        this.errors = errors

        if(stack){
            this.stack= stack
        }else{
            Error.captureStackTrace(this,this.stack)
        }
    }
}

export {ApiErrors}