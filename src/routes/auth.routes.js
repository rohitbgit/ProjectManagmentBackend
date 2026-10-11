import express from "express";
import { registerUser, login } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validation.middleware.js";
import { userRegisterValidator, userLoginValidator } from "../validators/index.js";


const router = express.Router();

router.post('/register', userRegisterValidator(),validate,registerUser)
router.post('/login',userLoginValidator(), validate,login)

export default router;