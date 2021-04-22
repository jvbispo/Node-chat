import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity("settings")
class Setting {

    @PrimaryColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    chat: boolean;

    @CreateDateColumn()
    created_art: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Setting;