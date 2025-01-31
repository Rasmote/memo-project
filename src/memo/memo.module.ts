import { Module } from '@nestjs/common';
import { MemoController } from './memo.controller';
import { MemoService } from './memo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoEntity } from 'src/entity/memo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemoEntity])],
  controllers: [MemoController],
  providers: [MemoService]
})
export class MemoModule { }
