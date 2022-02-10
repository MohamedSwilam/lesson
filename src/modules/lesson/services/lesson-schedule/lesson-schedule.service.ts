import {Injectable, InternalServerErrorException, Logger,} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {LessonSchedule} from '../../entities/lesson-schedule.entity';
import {Repository} from 'typeorm';
import {CreateLessonScheduleDto} from '../../definitions/lesson-schedule.dto';
import {LessonRecurrencePlanService} from '../lesson-recurrence-plan/lesson-recurrence-plan.service';

@Injectable()
export class LessonScheduleService {
  private readonly logger = new Logger(LessonScheduleService.name);

  constructor(
    @InjectRepository(LessonSchedule)
    private lessonScheduleRepository: Repository<LessonSchedule>,
    private readonly lessonRecurrencePlanService: LessonRecurrencePlanService,
  ) {}

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
   * Store lesson schedule in the database
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
}
