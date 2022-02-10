import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CrudResponse } from '../../../../responses/crud.response';
import { CreateLessonCancelledDto } from '../../definitions/lesson-cancelled.dto';
import { LessonCancelledService } from '../../services/lesson-cancelled/lesson-cancelled.service';

@ApiTags('lesson-cancels')
@Controller('lesson-cancels')
export class LessonCancelledController {
  constructor(
    private readonly lessonCancelledService: LessonCancelledService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create lesson cancellation' })
  @ApiResponse({
    status: 201,
    type: String,
  })
  @UsePipes(ValidationPipe)
  async createLessonCancellation(
    @Body()
    createLessonCancelledDto: CreateLessonCancelledDto,
  ): Promise<Record<string, any>> {
    return new CrudResponse().createResponse({
      id: await this.lessonCancelledService.save(createLessonCancelledDto),
    });
  }
}
