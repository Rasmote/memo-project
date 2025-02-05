import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoModule } from './memo/memo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemoEntity } from './entity/memo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '113.198.230.24',
      port: 1032,
      username: 'sinhyeok',
      password: 'sinhyeok',
      database: 'memoDB',
      entities: [MemoEntity],
      synchronize: true,
      logging: true,
    }),

    MemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }