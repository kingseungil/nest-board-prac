import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Board } from './board.model';
import { BoardsService } from './boards.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    // Param 여러개 가져올 때 : @Param() params: string[]
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    @Post('/')
    createBoard(@Body() createBoardDto: CreateBoardDto): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Param('id') id: string): object {
        this.boardsService.deleteBoard(id);
        return { message: '삭제 성공' };
    }

    @Put('/:id')
    updateBoard(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto): Board {
        return this.boardsService.updateBoard(id, updateBoardDto);
    }
}
