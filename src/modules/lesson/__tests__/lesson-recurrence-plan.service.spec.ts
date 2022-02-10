import { Test, TestingModule } from '@nestjs/testing';
import { LessonRecurrencePlanService } from '../services/lesson-recurrence-plan/lesson-recurrence-plan.service';

describe('LessonRecurrencePlanService', () => {
  let service: LessonRecurrencePlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonRecurrencePlanService],
    }).compile();

    service = module.get<LessonRecurrencePlanService>(
      LessonRecurrencePlanService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
