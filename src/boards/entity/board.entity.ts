import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { BoardStatus } from '../board.model';

@Entity('Board')
export class BoardEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: BoardStatus;
}
