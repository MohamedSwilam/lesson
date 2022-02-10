import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonModule } from './modules/lesson/lesson.module';
import { LessonSchedule } from './modules/lesson/entities/lesson-schedule.entity';
import { LessonRecurrencePlan } from './modules/lesson/entities/lesson-recurrence-plan.entity';
import { LessonException } from './modules/lesson/entities/lesson-exception.entity';
import { LessonCancelled } from './modules/lesson/entities/lesson-cancelled.entity';

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
      entities: [
        LessonSchedule,
        LessonRecurrencePlan,
        LessonException,
        LessonCancelled,
      ],
      synchronize: true,
    }),
    LessonModule,
  ],
})
export class AppModule {}
