import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";

@Entity("connections")
class Connection {

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
    socket_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Connection;