import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonSchedule } from '../entities/lesson-schedule.entity';
import { Repository, UpdateResult } from 'typeorm';
import {
  CreateLessonScheduleDto,
  UpdateLessonScheduleDto,
} from '../definitions/lesson-schedule.dto';
import { LessonRecurrencePlanService } from './lesson-recurrence-plan.service';
import { LessonFetchEngineService } from './lesson-fetch-engine.service';

@Injectable()
export class LessonScheduleService {
  private readonly logger = new Logger(LessonScheduleService.name);

  constructor(
    @InjectRepository(LessonSchedule)
    private lessonScheduleRepository: Repository<LessonSchedule>,
    private readonly lessonRecurrencePlanService: LessonRecurrencePlanService,
    private readonly lessonFetchEngineService: LessonFetchEngineService,
  ) {}

  async view(id: number) {
    const scheduledLessons = await this.lessonScheduleRepository.findOneOrFail({
      where: { id: id },
      relations: ['lessonRecurrencePlan', 'lessonException', 'lessonCancelled'],
    });

    return this.lessonFetchEngineService.format(scheduledLessons);
  }

  /**
   * Save new lesson schedule in the database
   *
   * @return Promise<number>
   * @param createLessonScheduleDto
   */
  async save(
    createLessonScheduleDto: CreateLessonScheduleDto,
  ): Promise<number> {
    try {
      const response = await this.lessonScheduleRepository.insert(
        createLessonScheduleDto,
      );
      return response.identifiers.pop()['id'];
    } catch (error) {
      this.logger.error(
        'Unexpected error occurred in saving new lesson schedule',
        error,
      );

      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Update lesson schedule in the database
   *
   * @return UpdateResult
   * @param id
   * @param updateLessonScheduleDto
   */
  async update(
    id: number,
    updateLessonScheduleDto: UpdateLessonScheduleDto,
  ): Promise<UpdateResult> {
    try {
      return await this.lessonScheduleRepository.update(
        { id },
        updateLessonScheduleDto,
      );
    } catch (error) {
      this.logger.error(
        'Unexpected error occurred in updating lesson schedule in database',
        error,
      );

      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Create lesson schedule with recurrence plan if exists in the database
   *
   * @param createLessonScheduleDto
   * @return string
   */
  async createLessonSchedule(
    createLessonScheduleDto: CreateLessonScheduleDto,
  ): Promise<number> {
    try {
      // Save lesson recurrence plan if exists
      if (createLessonScheduleDto.lessonRecurrencePlan) {
        createLessonScheduleDto.lessonRecurrencePlanId =
          await this.lessonRecurrencePlanService.save(
            createLessonScheduleDto.lessonRecurrencePlan,
          );
      }

      // Save lesson schedule & return ID
      return await this.save(createLessonScheduleDto);
    } catch (error) {
      // Log the error
      this.logger.error(
        'Unexpected error occurred in creating new lesson schedule',
        error,
      );
      // Through Exception
      throw new InternalServerErrorException(error);
    }
  }

  /**
   * Update lesson schedule with recurrence plan if exists in the database
   *
   * @return string
   * @param id
   * @param updateLessonScheduleDto
   */
  async updateLessonSchedule(
    id: number,
    updateLessonScheduleDto: UpdateLessonScheduleDto,
  ): Promise<number> {
    try {
      // View lesson schedule
      const lessonSchedule = await this.lessonScheduleRepository.findOneOrFail({
        id,
      });

      // Update lesson recurrence plan if exists
      if (updateLessonScheduleDto.lessonRecurrencePlan) {
        // Update lesson recurrence plan if exists
        if (lessonSchedule.lessonRecurrencePlanId) {
          await this.lessonRecurrencePlanService.update(
            lessonSchedule.lessonRecurrencePlanId,
            updateLessonScheduleDto.lessonRecurrencePlan,
          );
        } else {
          // Create lesson recurrence plan if not exists and append ID
          updateLessonScheduleDto.lessonRecurrencePlanId =
            await this.lessonRecurrencePlanService.save(
              updateLessonScheduleDto.lessonRecurrencePlan,
            );
        }
      }

      // Update lesson schedule
      delete updateLessonScheduleDto.lessonRecurrencePlan;
      await this.update(id, updateLessonScheduleDto);

      // return updated lesson schedule ID
      return id;
    } catch (error) {
      // Log the error
      this.logger.error(
        'Unexpected error occurred in updating lesson schedule',
        error,
      );

      // Through Exception
      throw new InternalServerErrorException(error);
    }
  }
}
