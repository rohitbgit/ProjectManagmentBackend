import { body } from "express-validator"

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is inValid"),
        body("username")
            .trim()
            .isEmpty()
            .withMessage("Username is required")
            .isLowercase()
            .withMessage("Username must be in lowercase")
            .isLength({ min: 3 })
            .withMessage("Username must be atleast 3 characters"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
        body("fullname")
            .optional()
            .trim()

    ]
}
const userLoginValidator = () => {
    return [
        body("email")
            .trim()
            .isEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is inValid"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required"),
    ]
}

export { userRegisterValidator , userLoginValidator}