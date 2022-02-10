import { Module } from '@nestjs/common';
import { LessonScheduleController } from './controllers/lesson-schedule/lesson-schedule.controller';
import { LessonScheduleService } from './services/lesson-schedule/lesson-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonSchedule } from './entities/lesson-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LessonSchedule])],
  controllers: [LessonScheduleController],
  providers: [LessonScheduleService],
})
export class LessonModule {}
