import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from './modules/lesson/lesson.module';
import { LessonSchedule } from './modules/lesson/entities/lesson-schedule.entity';

const config = require('../config');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.db.host,
      port: config.db.port,
      username: config.db.username,
      password: config.db.password,
      database: config.db.name,
      entities: [LessonSchedule],
      synchronize: true,
    }),
    LessonModule,
  ],
})
export class AppModule {}
