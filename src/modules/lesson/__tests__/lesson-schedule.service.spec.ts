import { Test, TestingModule } from '@nestjs/testing';
import { LessonScheduleService } from '../services/lesson-schedule.service';

describe('LessonScheduleService', () => {
  let service: LessonScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LessonScheduleService],
    }).compile();

    service = module.get<LessonScheduleService>(LessonScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
