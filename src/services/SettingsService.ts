import { getCustomRepository, Repository } from "typeorm"
import Setting from "../entities/Setting";
import SettingsRepository from "../repositories/SettingsRepository";

interface ISettingsCreate {
    chat: boolean;
    username: string;
}

export default class SettingsService {
    private settingsRepository: Repository<Setting>
    constructor() {
        this.settingsRepository = getCustomRepository(SettingsRepository);
    };

    public async create({ chat, username }: ISettingsCreate): Promise<Setting> {
        const userAlreadyExists = await this.settingsRepository.findOne({
            username,
        })

        if (userAlreadyExists) {
            throw new Error('User already exists');
        };

        const settings = this.settingsRepository.create({ chat, username });
        return this.settingsRepository.save(settings);
    }

    public async findByUsername(username: string): Promise<Setting | undefined> {
        return this.settingsRepository.findOne({ username });
    }

    public async update(username: string, chat: boolean): Promise<void> {
        this.settingsRepository.createQueryBuilder().update(Setting).set({ chat }).where("username = :username", { username }).execute();

    }
}