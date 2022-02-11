import { Module } from '@nestjs/common';
import { LessonScheduleController } from './controllers/lesson-schedule/lesson-schedule.controller';
import { LessonScheduleService } from './services/lesson-schedule/lesson-schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonSchedule } from './entities/lesson-schedule.entity';
import { LessonRecurrencePlan } from './entities/lesson-recurrence-plan.entity';
import { LessonException } from './entities/lesson-exception.entity';
import { LessonCancelled } from './entities/lesson-cancelled.entity';
import { LessonRecurrencePlanService } from './services/lesson-recurrence-plan/lesson-recurrence-plan.service';
import { LessonCancelledController } from './controllers/lesson-cancelled/lesson-cancelled.controller';
import { LessonCancelledService } from './services/lesson-cancelled/lesson-cancelled.service';
import { LessonExceptionsController } from './controllers/lesson-exception/lesson-exceptions.controller';
import { LessonExceptionService } from './services/lesson-exception/lesson-exception.service';
import { LessonFetchEngineService } from './services/lesson-fetch-engine/lesson-fetch-engine.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LessonSchedule,
      LessonRecurrencePlan,
      LessonException,
      LessonCancelled,
    ]),
  ],
  controllers: [
    LessonScheduleController,
    LessonCancelledController,
    LessonExceptionsController,
  ],
  providers: [
    LessonScheduleService,
    LessonRecurrencePlanService,
    LessonCancelledService,
    LessonExceptionService,
    LessonFetchEngineService,
  ],
})
export class LessonModule {}
