import { UserEntity } from './entity/user.entity';
import { AuthCredentialDto } from './dto/auth-credential';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
        return this.authService.signUp(authCredentialDto);
    }
}
