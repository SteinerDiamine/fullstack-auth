//@ts-nocheck
import { Router } from "express";
import * as userHandler from '../handlers/user-handler'
const usersRouter = Router();

//@ts-ignore
usersRouter.get('/:id', userHandler.getUser )
usersRouter.post('/register', userHandler.registerUser);
usersRouter.post('/login', userHandler.loginUser);


export default usersRouter;