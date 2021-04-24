import {Request, Response} from 'express';
import UsersService from '../services/UsersService';

export default class UsersController {
    async create (req: Request, res: Response): Promise<void> {
        const userService = new UsersService();
        const {email} = req.body;
        const settings = await userService.create(email);
        res.json(settings);
    };
}