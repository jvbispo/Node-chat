import { getCustomRepository, Repository } from "typeorm"
import Message from '../entities/Message';
import MessagesRepository from "../repositories/MessagesRepository";

interface IMessageCreate {
    admin_id?: string;
    user_id: string;
    text: string;
}

export default class MessagesService {
    private messagesRepository: Repository<Message>
    constructor () {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }
     
    public async create ({admin_id, text, user_id}: IMessageCreate): Promise<Message> {
        
        const message =  this.messagesRepository.create({admin_id, text, user_id});
        return this.messagesRepository.save(message);
    }

    public async listByUser (user_id: string): Promise<Message[]> {
        
        return this.messagesRepository.find({ 
            where: {
                user_id: `${user_id}`
            },
            relations: ['user']
        },);
    }
}