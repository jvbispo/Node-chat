import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import SettingsRepository from '../repositories/SettingsRepository';
import SettingsService from '../services/SettingsService';

export default class SettingsController {
    async create (req: Request, res: Response): Promise<void> {
        const settingService = new SettingsService();
        const {chat, username} = req.body;
        try {
            const settings = await settingService.create({chat, username});

            res.json(settings);
        } catch (err){
            res.status(400).send(err.message)
        }
    };

    async findByUsername (req: Request, res: Response): Promise<void> {
        const {username} = req.params;

        const settingsService = new SettingsService();

        const settings = await settingsService.findByUsername(username);

        res.json(settings); 
    }

    async update (req: Request, res: Response): Promise<void> {
        const {username} = req.params;
        const {chat} = req.body;

        const settingsService = new SettingsService();

        await settingsService.update(username, chat);

        res.sendStatus(200); 
    }
}