import { Router } from "express";
import UsersController from "../controllers/UsersController";


const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/users', async (req, res): Promise<void> => usersController.create(req,res));

export default usersRouter;