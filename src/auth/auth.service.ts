import { AuthCredentialDto } from './dto/auth-credential';
import { UserEntity } from './entity/user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
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
        try {
            const user = this.userRepository.create({
                username,
                password,
            });
            await this.userRepository.save(user);
            return user;
        } catch (error) {
            if (error.errno === 1062) {
                throw new ConflictException(`${username}은 이미 존재해용`);
            } else {
                throw new InternalServerErrorException('앗 예상하지 못한 에러네요');
            }
        }
    }
}
