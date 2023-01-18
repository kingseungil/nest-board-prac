import { BoardEntity } from './entity/board.entity';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
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
    constructor(private boardsService: BoardsService) {}

    // @Get('/')
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }

    @Get('/:id')
    // Param 여러개 가져올 때 : @Param() params: string[]
    getBoardById(@Param('id') id: number): Promise<BoardEntity> {
        return this.boardsService.getBoardById(id);
    }

    // @Post('/')
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): object {
    //     this.boardsService.deleteBoard(id);
    //     return { message: '삭제 성공' };
    // }

    // @Patch('/:id/status')
    // @UsePipes(ValidationPipe)
    // updateBoardStatus(
    //     @Param('id') id: string,
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    // ): Board {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
