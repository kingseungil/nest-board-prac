import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { BoardsModule } from './boards/boards.module';

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
            logging: false,
            entities: [__dirname + '/**/*.entity{.js,.ts}'],
            autoLoadEntities: true,
        }),
        BoardsModule,
    ],
})
export class AppModule {}
