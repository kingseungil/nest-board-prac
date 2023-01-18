import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number;
    @Column()
    username: string;
    @Column()
    password: string;
}
