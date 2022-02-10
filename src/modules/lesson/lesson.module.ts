import { Module } from '@nestjs/common';
import { LessonScheduleController } from './controllers/lesson-schedule/lesson-schedule.controller';
import { LessonScheduleService } from './services/lesson-schedule/lesson-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonSchedule } from './entities/lesson-schedule.entity';
import { LessonRecurrencePlan } from './entities/lesson-recurrence-plan.entity';
import { LessonException } from './entities/lesson-exception.entity';
import { LessonCancelled } from './entities/lesson-cancelled.entity';
import { LessonRecurrencePlanService } from './services/lesson-recurrence-plan/lesson-recurrence-plan.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonSchedule,
      LessonRecurrencePlan,
      LessonException,
      LessonCancelled,
    ]),
  ],
  controllers: [LessonScheduleController],
  providers: [LessonScheduleService, LessonRecurrencePlanService],
})
export class LessonModule {}
