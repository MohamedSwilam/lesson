import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonRecurrencePlan } from '../../entities/lesson-recurrence-plan.entity';
import { CreateLessonRecurrencePlanDto } from '../../definitions/lesson-schedule.dto';

@Injectable()
export class LessonRecurrencePlanService {
  private readonly logger = new Logger(LessonRecurrencePlanService.name);

  constructor(
    @InjectRepository(LessonRecurrencePlan)
    private lessonRecurrencePlanRepository: Repository<LessonRecurrencePlan>,
  ) {}

  /**
   * Save lesson recurrence plan in the database
   *
   * @param createLessonRecurrencePlanDto
   * @return string
   */
  async save(
    createLessonRecurrencePlanDto: CreateLessonRecurrencePlanDto,
  ): Promise<number> {
    try {
      const response = await this.lessonRecurrencePlanRepository.insert(
        createLessonRecurrencePlanDto,
      );
      return response.identifiers.pop()['id'];
    } catch (error) {
      this.logger.error(
        'Unexpected error occurred in saving new lesson recurrence plan',
        error,
      );

      throw new InternalServerErrorException(error);
    }
  }
}
