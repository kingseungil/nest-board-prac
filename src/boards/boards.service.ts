import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    // fake DB
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards;
    }
    createBoard(createBoardDto: CreateBoardDto) {
        const { title, description } = createBoardDto;
        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC,
        };
        this.boards.push(board);
        return board;
    }
    getBoardById(id: string): Board {
        const board = this.boards.find((board) => board.id === id);
        if (!board) {
            throw new NotFoundException(`해당 ${id} 게시글이 없어용`);
        }
        return board;
    }

    deleteBoard(id: string): void {
        this.boards = this.boards.filter((board) => board.id !== id);
    }

    updateBoard(id: string, updateBoardDto: UpdateBoardDto): Board {
        const { title, description, status } = updateBoardDto;
        const board = this.getBoardById(id);
        if (!board) {
            throw new NotFoundException(`해당 ${id} 게시글이 없어용`);
        }
        board.title = title;
        board.description = description;
        board.status = status;
        return board;
    }
}
