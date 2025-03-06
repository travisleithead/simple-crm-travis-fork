import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne((type) => User, (user) => user.notes)
    user: User;

    @Column()
    content: string;

    // Note: for sqlite, there is a {type: "datetime"} specific column type for timestamps
    // (https://typeorm.io/entities#column-types-for-sqlite--cordova--react-native--expo), but that
    // makes the project less mobile (e.g., to a different underlying database in the future as
    // 'datetime' is not a column type in postgres for example.)
    @Column()   
    timestamp: number;
}
