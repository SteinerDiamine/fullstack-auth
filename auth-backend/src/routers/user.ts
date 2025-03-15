import { Router } from "express";
import * as userHandler from '../handlers/user-handler'
const usersRouter = Router();

//@ts-ignore
usersRouter.get('/:id', userHandler.getUser )
//@ts-ignore
usersRouter.post('/new', userHandler.createUser)

export default usersRouter;