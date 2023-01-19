import { UserEntity } from './../../auth/entity/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import { BoardStatus } from '../board-status.enum';

@Entity('Board')
export class BoardEntity {
    @PrimaryGeneratedColumn()
    boardId: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: BoardStatus;
    @ManyToOne(() => UserEntity, (user) => user.boards, { eager: false })
    user: UserEntity;
}
