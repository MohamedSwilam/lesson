import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LessonException } from '../entities/lesson-exception.entity';
import { CreateLessonExceptionDto } from '../definitions/lesson-exception.dto';

@Injectable()
export class LessonExceptionService {
  private readonly logger = new Logger(LessonExceptionService.name);

  constructor(
    @InjectRepository(LessonException)
    private lessonExceptionRepository: Repository<LessonException>,
  ) {}

  /**
   * Save new lesson exception in the database
   *
   * @return Promise<number>
   * @param createLessonExceptionDto
   */
  async save(
    createLessonExceptionDto: CreateLessonExceptionDto,
  ): Promise<number> {
    try {
      const response = await this.lessonExceptionRepository.insert(
        createLessonExceptionDto,
      );
      return response.identifiers.pop()['id'];
    } catch (error) {
      this.logger.error(
        'Unexpected error occurred in saving new lesson exception',
        error,
      );

      throw new InternalServerErrorException(error);
    }
  }
}
