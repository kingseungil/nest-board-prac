import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    userId: number;
    @Column({ unique: true })
    username: string;
    @Column()
    password: string;
}
