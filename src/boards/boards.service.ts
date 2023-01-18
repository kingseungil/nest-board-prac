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
    async getAllBoards(): Promise<BoardEntity[]> {
        return await this.boardRepository.find();
    }

    async createBoard(createBoardDto: CreateBoardDto): Promise<BoardEntity> {
        const { title, description } = createBoardDto;
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
        });
        await this.boardRepository.save(board);
        return board;
    }

    async getBoardById(id: number): Promise<BoardEntity> {
        const board = await this.boardRepository.findOneBy({ boardId: id });
        if (!board) {
            throw new NotFoundException(`해당 ${id} 게시글이 없어용`);
        }
        return board;
    }
    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`${id} 게시글이 없어용`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<BoardEntity> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
}
