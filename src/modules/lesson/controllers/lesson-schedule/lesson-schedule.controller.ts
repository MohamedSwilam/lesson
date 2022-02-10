import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonScheduleService } from '../../services/lesson-schedule/lesson-schedule.service';
import { CreateLessonScheduleDto } from '../../definitions/lesson-schedule.dto';
import { CrudResponse } from '../../../../responses/crud.response';

@ApiTags('lesson-schedules')
@Controller('lesson-schedules')
export class LessonScheduleController {
  constructor(private readonly lessonScheduleService: LessonScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Create lesson schedule' })
  @ApiResponse({
    status: 201,
    type: String,
  })
  @UsePipes(ValidationPipe)
  async createLessonSchedule(
    @Body()
    createLessonScheduleDto: CreateLessonScheduleDto,
  ): Promise<Record<string, any>> {
    return new CrudResponse().createResponse({
      id: await this.lessonScheduleService.create(createLessonScheduleDto),
    });
  }
}
