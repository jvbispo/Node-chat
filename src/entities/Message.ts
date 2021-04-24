import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";

@Entity("messages")
class Message {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @JoinColumn({name: 'user_id'})
    @ManyToOne(() => User)
    user: User;

    @Column()
    user_id: string;

    @Column()
    admin_id: string;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;


}

export default Message;