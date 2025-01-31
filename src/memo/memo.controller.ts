import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { MemoService } from './memo.service';

@Controller('memo')
export class MemoController {
    constructor(private readonly memoService: MemoService) { }

    @Post('create')
    async create(@Body() body: { title: string; content: string }) {
        return this.memoService.createMemo(body.title, body.content);
    }

    @Get('read')
    async read(@Query('num') num: number) {
        return this.memoService.readMemo(num);
    }

    @Post('update')
    async update(@Body() body: { num: number; title: string; content: string }) {
        return this.memoService.updateMemo(body.num, body.title, body.content);
    }

    @Get('delete')
    async delete(@Query('num') num: number) {
        return this.memoService.deleteMemo(num);
    }

    @Get('/show')
    async show() {
        return this.memoService.showAllMemos();
    }
}
