import { Router } from "express";
import usersRouter from "./user";
import validationRouter from "./validation";


const appRouter = Router();
appRouter.use('/user', usersRouter);
appRouter.use('/validate', validationRouter);


export default appRouter;