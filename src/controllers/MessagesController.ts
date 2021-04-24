import {Request, Response} from 'express';
import MessagesService from '../services/MessagesService';

export default class MessagesController {
    async create (req: Request, res: Response): Promise<void> {
        const messagesService = new MessagesService();
        const {text, user_id, admin_id} = req.body;
        try {
            const message = await messagesService.create({admin_id, text, user_id});

            res.json(message);
        } catch (err){
            res.status(400).send(err.message)
        }
    };

    async get (req: Request, res: Response): Promise<void> {
        const messagesService = new MessagesService();
        const { user_id} = req.params;
        console.log(user_id);
        const messages = await messagesService.listByUser(String(user_id));
        res.json(messages);
    };
}