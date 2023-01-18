import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // 영어랑 숫자만 가능하게
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: '영어랑 숫자만 가능해요',
    })
    password: string;
}
