import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { BoardEntity } from './entity/board.entity';
import {
    Body,
    Controller,
    Delete,
    Get,
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
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Promise<BoardEntity[]> {
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    // Param 여러개 가져올 때 : @Param() params: string[]
    getBoardById(@Param('id') id: number): Promise<BoardEntity> {
        return this.boardsService.getBoardById(id);
    }

    @Post('/')
    @UseGuards(AuthGuard())
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDto: CreateBoardDto): Promise<BoardEntity> {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteBoard(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
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
