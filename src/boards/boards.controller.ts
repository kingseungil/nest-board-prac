import { UserEntity } from './../auth/entity/user.entity';
import { GetUser } from './../auth/decorator/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { BoardEntity } from './entity/board.entity';
import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
    private logger = new Logger('BoardsController');
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Promise<BoardEntity[]> {
        this.logger.verbose(`누군가 게시글을 불러왔어요!`);
        return this.boardsService.getAllBoards();
    }
    @Get('/user/:id')
    getAllBoardByUser(
        // @GetUser() user: UserEntity,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<BoardEntity[]> {
        return this.boardsService.getAllBoardByUser(id);
    }

    @Get('/:id')
    // Param 여러개 가져올 때 : @Param() params: string[]
    getBoardById(@Param('id') id: number): Promise<BoardEntity> {
        return this.boardsService.getBoardById(id);
    }

    @Post('/')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user: UserEntity,
    ): Promise<BoardEntity> {
        this.logger.verbose(
            `${user.username}님이 게시글을 작성했어요! payload:${JSON.stringify(createBoardDto)}`,
        );
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteBoard(@Param('id', ParseIntPipe) id: number, @GetUser() user: UserEntity): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }

    @Patch('/:id/status')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<BoardEntity> {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
