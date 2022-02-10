import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonCancelled } from '../../entities/lesson-cancelled.entity';
import { CreateLessonCancelledDto } from '../../definitions/lesson-cancelled.dto';

@Injectable()
export class LessonCancelledService {
  private readonly logger = new Logger(LessonCancelledService.name);

  constructor(
    @InjectRepository(LessonCancelled)
    private lessonCancelledRepository: Repository<LessonCancelled>,
  ) {}

  /**
   * Save new lesson cancellation in the database
   *
   * @return Promise<number>
   * @param createLessonCancelledDto
   */
  async save(
    createLessonCancelledDto: CreateLessonCancelledDto,
  ): Promise<number> {
    try {
      const response = await this.lessonCancelledRepository.insert(
        createLessonCancelledDto,
      );
      return response.identifiers.pop()['id'];
    } catch (error) {
      this.logger.error(
        'Unexpected error occurred in saving new lesson cancellation',
        error,
      );

      throw new InternalServerErrorException(error);
    }
  }
}
