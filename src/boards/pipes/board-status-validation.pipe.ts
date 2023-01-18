import { BadRequestException } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common/interfaces';
import { BoardStatus } from '../board.model';

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];
    transform(value: any) {
        value = value;
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value}는 올바른 status가 아닙니다`);
        }
        return value;
    }
    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}
