import { Test, TestingModule } from '@nestjs/testing';
import { LessonScheduleController } from '../controllers/lesson-schedule.controller';

describe('LessonScheduleController', () => {
  let controller: LessonScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LessonScheduleController],
    }).compile();

    controller = module.get<LessonScheduleController>(LessonScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
