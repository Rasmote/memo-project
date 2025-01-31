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
      host: '127.0.0.1',
      port: 3307,
      username: 'root',
      password: 'sinhyeok',
      database: 'memoDB',
      entities: [MemoEntity],
      synchronize: true,
    }),
    MemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
