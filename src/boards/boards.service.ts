import { UnauthorizedException } from '@nestjs/common/exceptions';
import { UserEntity } from './../auth/entity/user.entity';
import { BoardEntity } from './entity/board.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
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

    async createBoard(createBoardDto: CreateBoardDto, user: UserEntity): Promise<BoardEntity> {
        const { title, description } = createBoardDto;
        const board = this.boardRepository.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
            user: user,
        });
        await this.boardRepository.save(board);
        return board;
    }

    async getAllBoardByUser(id: number): Promise<BoardEntity[]> {
        const query = this.boardRepository.createQueryBuilder('board');
        query.where('board.userUserId = :userId', { userId: id });
        const boards = await query.getMany();
        if (boards.length === 0) {
            throw new NotFoundException(`해당 ${id} 유저의 게시글이 없어용`);
        }
        return boards;
    }

    async getBoardById(id: number): Promise<BoardEntity> {
        const board = await this.boardRepository.findOneBy({ boardId: id });
        if (!board) {
            throw new NotFoundException(`해당 ${id} 게시글이 없어용`);
        }
        return board;
    }
    async deleteBoard(id: number, user: UserEntity): Promise<void> {
        const board = await this.getBoardById(id);
        if (!board) {
            throw new NotFoundException(`${id} 게시글이 없어요`);
        }
        const result = await this.boardRepository.delete({ boardId: id, user });
        if (result.affected === 0) {
            throw new UnauthorizedException(`작성자만 삭제할 수 있어용`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<BoardEntity> {
        const board = await this.getBoardById(id);
        board.status = status;
        await this.boardRepository.save(board);
        return board;
    }
}
