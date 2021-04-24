import { Router } from "express";
import MessagesController from "../controllers/MessagesController";


const messagesRouter = Router();
const messagesController = new MessagesController();

messagesRouter.post('/messages', async (req, res): Promise<void> => messagesController.create(req,res));
messagesRouter.get('/messages/:user_id', async (req, res): Promise<void> => messagesController.get(req,res));

export default messagesRouter; 