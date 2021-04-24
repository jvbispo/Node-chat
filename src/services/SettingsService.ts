import { getCustomRepository } from "typeorm"
import Setting from "../entities/Setting";
import SettingsRepository from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

export default class SettingsService {
    constructor() {

    }; 

    public async create ({chat, username}: ISettingsCreate): Promise<Setting> {
        const settingsRepository = getCustomRepository(SettingsRepository);
        const userAlreadyExists = await settingsRepository.findOne({
            username,
        })

        if (userAlreadyExists) {
            throw new Error('User already exists');
        };
        
        const settings =  settingsRepository.create({chat,username});
        return settingsRepository.save(settings);
    }
}