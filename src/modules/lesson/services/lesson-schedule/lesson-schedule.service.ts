import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessonSchedule } from '../../entities/lesson-schedule.entity';
import { Repository } from 'typeorm';
import { CreateLessonScheduleDto } from '../../definitions/lesson-schedule.dto';

@Injectable()
export class LessonScheduleService {
  private readonly logger = new Logger(LessonScheduleService.name);

  constructor(
    @InjectRepository(LessonSchedule)
    private lessonScheduleRepository: Repository<LessonSchedule>,
  ) {}

  /**
   * Create lesson schedule in the database
   *
   * @param createLessonScheduleDto
   * @return string
   */
  async create(
    createLessonScheduleDto: CreateLessonScheduleDto,
  ): Promise<string> {
    try {
      const response = await this.lessonScheduleRepository.insert(
        createLessonScheduleDto,
      );
      return response.identifiers.pop()['id'];
    } catch (error) {
      this.logger.error(
        'Unexpected error occurred in creating new event token benefit allocation',
        error,
      );

      throw new InternalServerErrorException(error);
    }
  }
}
