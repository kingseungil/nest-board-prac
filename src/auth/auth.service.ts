import { AuthCredentialDto } from './dto/auth-credential';
import { UserEntity } from './entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}
    async signUp(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
        const { username, password } = authCredentialDto;
        const user = this.userRepository.create({
            username,
            password,
        });
        await this.userRepository.save(user);
        return user;
    }
}
