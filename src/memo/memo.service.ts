import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Param, ParseIntPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository, UpdateDescription } from 'typeorm';
import { MemoEntity } from 'src/entity/memo.entity';
import { CreateMemoDto, DeleteMemoDto, ReadMemoDto, UpdateMemoDto } from 'src/dto/memo.dto';
import { CreateMemoResponseDto, DeleteMemoResponseDto, UpdateMemoResponseDto } from '../dto/memo.response.dto'

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(MemoEntity)
        private memoRepository: Repository<MemoEntity>,
    ) { }

    async createMemo(dto: CreateMemoDto): Promise<CreateMemoResponseDto> {
        const memo = this.memoRepository.create({ title: dto.title, content: dto.content });
        await this.memoRepository.save(memo);
        return new CreateMemoResponseDto('메모 작성 완료');
    }

    async readMemo(dto: ReadMemoDto): Promise<{ title: string; content: string }> {
        const memo = await this.memoRepository.findOne({ where: { num: dto.num } });
        if (!memo) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');   //404
        }
        console.log(dto.num, "번 게시글 반환 ", memo.title);
        return { title: memo.title, content: memo.content };
    }

    async updateMemo(dto: UpdateMemoDto): Promise<UpdateMemoResponseDto> {
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
        return new UpdateMemoResponseDto('메모 업데이트 완료');
    }

    async deleteMemo(dto: DeleteMemoDto): Promise<DeleteMemoResponseDto> {
        const num = +dto.num;
        const result = await this.memoRepository.delete({ num: dto.num });
        if (result.affected === 0) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');
        }
        return new DeleteMemoResponseDto('메모 삭제 완료');
    }

    async showAllMemos(): Promise<{ num: number; title: string }[]> {
        const result = await this.memoRepository.find({ select: ['num', 'title'] });
        if (result.length === 0) {
            throw new NotFoundException('저장된 메모가 없습니다.');
        }
        return result;
    }
}
