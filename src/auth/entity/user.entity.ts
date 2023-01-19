import { BoardEntity } from './../../boards/entity/board.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;

    @OneToMany(() => BoardEntity, (board) => board.user, { eager: true })
    boards: BoardEntity[];
}
