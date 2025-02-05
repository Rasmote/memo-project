import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { MemoService } from './memo.service';
import { CreateMemoDto, UpdateMemoDto } from 'src/dto/memo.dto';

@Controller('memo')
export class MemoController {
    constructor(private readonly memoService: MemoService) { }

    @Post('create')
    async create(@Body() body: CreateMemoDto) {
        return this.memoService.createMemo(body);
    }

    @Get('read')
    async read(@Query('num') num: number) {
        return this.memoService.readMemo(num);
    }

    @Post('update')
    async update(@Body() body: UpdateMemoDto) {
        return this.memoService.updateMemo(body);
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
