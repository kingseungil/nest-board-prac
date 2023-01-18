// 클래스는 인터페이스와 다르게 런타임에서 작동하기 때문에 파이프 같은 기능을 이용할 때 더 유용

import { IsNotEmpty } from 'class-validator';
import { BoardStatus } from '../board.model';

// 따라서 클래스를 사용하여 DTO작성
export class CreateBoardDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}

export class UpdateBoardDto extends CreateBoardDto {
    status: BoardStatus;
}
