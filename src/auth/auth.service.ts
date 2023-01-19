import { AuthCredentialDto } from './dto/auth-credential';
import { UserEntity } from './entity/user.entity';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
    ) {}
    async signUp(authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
        const { username, password } = authCredentialDto;
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = this.userRepository.create({
                username,
                password: hashPassword,
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
    async logIn(authCredentialDto: AuthCredentialDto): Promise<{ accessToken: string }> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOneBy({ username });
        if (!user) {
            throw new UnauthorizedException('아이디가 없네용');
        }
        const pwCheck = await bcrypt.compare(password, user.password);
        if (!pwCheck) {
            throw new UnauthorizedException('비밀번호가 틀렸어용');
        }
        // 유저 토큰 생성 (Secret + Payload)
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
}
