import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemoEntity } from 'src/entity/memo.entity';
import { CreateMemoDto, UpdateMemoDto } from 'src/dto/memo.dto';

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(MemoEntity)
        private memoRepository: Repository<MemoEntity>,
    ) { }

    async createMemo(dto: CreateMemoDto): Promise<string> {
        const memo = this.memoRepository.create({ title: dto.title, content: dto.content });
        await this.memoRepository.save(memo);
        return '메모 작성 완료';
    }

    async readMemo(@Query('num', ParseIntPipe) num: number): Promise<{ title: string; content: string }> {
        if (!num) {
            throw new BadRequestException('읽어올 메모 번호가 입력되지 않았거나, 잘못된 매개변수입니다.');   //400
        }
        const memo = await this.memoRepository.findOne({ where: { num } });
        if (!memo) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');   //404
        }
        console.log(num, "번 게시글 반환 ", memo.title);
        return { title: memo.title, content: memo.content };
    }

    async updateMemo(dto: UpdateMemoDto): Promise<string> {
        if (!dto.num) {
            throw new BadRequestException('읽어올 메모 번호가 입력되지 않았거나, 잘못된 매개변수입니다.');   //400
        }
        const memo = await this.memoRepository.findOne({ where: { num: dto.num } });
        if (!memo) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');
        }
        memo.title = dto.title;
        memo.content = dto.content;
        try {
            await this.memoRepository.save(memo);
        }
        catch {
            throw new InternalServerErrorException("서버에 업데이트 도중 오류가 발생하였습니다.");
        }
        return '글 업데이트 완료';
    }

    async deleteMemo(num: number): Promise<string> {
        const result = await this.memoRepository.delete({ num });
        if (result.affected === 0) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');
        }
        return '글 삭제 완료';
    }

    async showAllMemos(): Promise<{ num: number; title: string }[]> {
        return this.memoRepository.find({ select: ['num', 'title'] });
    }
}
