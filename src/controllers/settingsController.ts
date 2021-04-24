import {Request, Response} from 'express';
import { getCustomRepository } from 'typeorm';
import SettingsRepository from '../repositories/SettingsRepository';
import SettingsService from '../SettingsService';

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
}