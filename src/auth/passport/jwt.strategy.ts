import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserEntity } from './../entity/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {
        super({
            secretOrKey: 'nestjs',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: any) {
        const { username } = payload;
        const user: UserEntity = await this.userRepository.findOneBy({ username });

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
