import { AuthModule } from './../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entity/board.entity';

@Module({
    imports: [TypeOrmModule.forFeature([BoardEntity]), AuthModule],
    controllers: [BoardsController],
    providers: [BoardsService],
})
export class BoardsModule {}
