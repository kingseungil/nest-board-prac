import { UserEntity } from './entity/user.entity';
import { AuthCredentialDto } from './dto/auth-credential';
import { AuthService } from './auth.service';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<UserEntity> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('/login')
    logIn(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
    ): Promise<{ accessToken: string }> {
        return this.authService.logIn(authCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard()) // req안에 user넣어주기 위함
    // 커스텀 데코레이터를 이용해서 바로 user가져오기
    test(@GetUser() user: UserEntity) {
        console.log('req', user);
    }
}
