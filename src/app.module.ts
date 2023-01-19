import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '0000',
            database: 'nest-prac',
            synchronize: false,
            logging: true,
            entities: [__dirname + '/**/*.entity{.js,.ts}'],
            autoLoadEntities: true,
        }),
        BoardsModule,
        AuthModule,
    ],
})
export class AppModule {}
