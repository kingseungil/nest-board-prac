import { BoardEntity } from './entity/board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardsService {
    // boardService에 BoardEntity 주입(@InjectRepository이용)
    constructor(
        @InjectRepository(BoardEntity)
        private boardRepository: Repository<BoardEntity>,
    ) {}
    // private boards: Board[] = [];
    // getAllBoards(): Board[] {
    //     return this.boards;
    // }
    // createBoard(createBoardDto: CreateBoardDto) {
    //     const { title, description } = createBoardDto;
    //     const board: Board = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: BoardStatus.PUBLIC,
    //     };
    //     this.boards.push(board);
    //     return board;
    // }
    async getBoardById(id: number): Promise<BoardEntity> {
        const board = await this.boardRepository.findOneBy({ boardId: id });
        if (!board) {
            throw new NotFoundException(`해당 ${id} 게시글이 없어용`);
        }
        return board;
    }
    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }
    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     if (!board) {
    //         throw new NotFoundException(`해당 ${id} 게시글이 없어용`);
    //     }
    //     board.status = status;
    //     return board;
    // }
}
