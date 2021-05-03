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

    public async findAllWithoutAdmin (): Promise<Connection[] | undefined> {
        return this.connectionsRepository.find({
            where: {admin_id: null},
            relations: ["user"],
        });
    };

    public async findBySocketId(socket_id: string): Promise<Connection | undefined> {
        return this.connectionsRepository.findOne({socket_id});
    }

    public async  updateAdminId (admin_id: string, user_id: string) {
        this.connectionsRepository.createQueryBuilder().update(Connection).set({ admin_id }).where("user_id = :user_id", { user_id}).execute();
    }
}