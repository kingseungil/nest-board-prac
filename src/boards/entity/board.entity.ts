import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
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
}
