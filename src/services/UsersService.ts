import { getCustomRepository, Repository } from "typeorm"
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";



export default class UsersService {
    usersRepository: Repository<User>;
    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);;
    }; 

    public async create (email: string): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findOne({email});

        if (userAlreadyExists) {
            return userAlreadyExists
        }; 
        
        const user =  this.usersRepository.create({email});
        return this.usersRepository.save(user);
    }

    public findByEmail (email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({email});

    }
}