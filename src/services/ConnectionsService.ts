import { getCustomRepository, Repository } from "typeorm"
import Connection from "../entities/Connection";
import ConnectionsRepository from "../repositories/ConnectinsRepository";

interface IConnectionCreate {
    admin_id?: string;
    user_id: string;
    socket_id: string;
    id?: string;
}

export default class ConnectionsService {
    private connectionsRepository: Repository<Connection>

    constructor () {
        this.connectionsRepository = getCustomRepository(ConnectionsRepository);
    }
     
    public async create ({admin_id, user_id, socket_id}: IConnectionCreate): Promise<Connection> {
        
        const connection = this.connectionsRepository.create({admin_id, socket_id, user_id});
        return this.connectionsRepository.save(connection);
    }

    public findByUserId (user_id: string): Promise<Connection | undefined> {
        return this.connectionsRepository.findOne({user_id});
    }

    
}