import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemoEntity } from 'src/entity/memo.entity';

@Injectable()
export class MemoService {
    constructor(
        @InjectRepository(MemoEntity)
        private memoRepository: Repository<MemoEntity>,
    ) { }

    async createMemo(title: string, content: string): Promise<string> {
        const memo = this.memoRepository.create({ title, content });
        await this.memoRepository.save(memo);
        return '메모 작성 완료';
    }

    async readMemo(num: number): Promise<{ title: string; content: string }> {
        const memo = await this.memoRepository.findOne({ where: { num } });
        if (!memo) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');
        }
        return { title: memo.title, content: memo.content };
    }

    async updateMemo(num: number, title: string, content: string): Promise<string> {
        const memo = await this.memoRepository.findOne({ where: { num } });
        if (!memo) {
            throw new NotFoundException('해당 메모를 찾을 수 없습니다.');
        }
        memo.title = title;
        memo.content = content;
        await this.memoRepository.save(memo);
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
