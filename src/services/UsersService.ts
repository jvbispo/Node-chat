import { getCustomRepository } from "typeorm"
import User from "../entities/User";
import UsersRepository from "../repositories/UsersRepository";



export default class UsersService {
    constructor() {

    }; 

    public async create (email: string): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userAlreadyExists = await usersRepository.findOne({email});

        if (userAlreadyExists) {
            return userAlreadyExists
        };
        
        const user =  usersRepository.create({email});
        return usersRepository.save(user);
    }
}