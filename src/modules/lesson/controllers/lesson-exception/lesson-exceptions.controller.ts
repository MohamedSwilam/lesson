import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudResponse } from '../../../../responses/crud.response';
import { LessonExceptionService } from '../../services/lesson-exception/lesson-exception.service';
import { CreateLessonExceptionDto } from '../../definitions/lesson-exception.dto';

@ApiTags('lesson-exceptions')
@Controller('lesson-exceptions')
export class LessonExceptionsController {
  constructor(
    private readonly lessonExceptionService: LessonExceptionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create lesson exception',
    description: 'API to save a specific lesson exception',
  })
  @ApiResponse({
    status: 201,
    type: String,
  })
  @UsePipes(ValidationPipe)
  async createLessonException(
    @Body()
    createLessonExceptionDto: CreateLessonExceptionDto,
  ): Promise<Record<string, any>> {
    return new CrudResponse().createResponse({
      id: await this.lessonExceptionService.save(createLessonExceptionDto),
    });
  }
}
