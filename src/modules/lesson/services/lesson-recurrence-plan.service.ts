import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { LessonRecurrencePlan } from '../entities/lesson-recurrence-plan.entity';
import {
  CreateLessonRecurrencePlanDto,
  UpdateLessonRecurrencePlanDto,
} from '../definitions/lesson-recurrence-plan.dto';

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

  /**
   * Update lesson recurrence plan in the database
   *
   * @return UpdateResult
   * @param id
   * @param updateLessonRecurrencePlanDto
   */
  async update(
    id: number,
    updateLessonRecurrencePlanDto: UpdateLessonRecurrencePlanDto,
  ): Promise<UpdateResult> {
    try {
      return await this.lessonRecurrencePlanRepository.update(
        { id },
        updateLessonRecurrencePlanDto,
      );
    } catch (error) {
      this.logger.error(
        'Unexpected error occurred in updating lesson recurrence plan',
        error,
      );

      throw new InternalServerErrorException(error);
    }
  }
}
