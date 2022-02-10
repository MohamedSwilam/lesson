import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonScheduleService } from '../../services/lesson-schedule/lesson-schedule.service';
import {
  CreateLessonScheduleDto,
  UpdateLessonScheduleDto,
} from '../../definitions/lesson-schedule.dto';
import { CrudResponse } from '../../../../responses/crud.response';
import { LessonSchedule } from '../../entities/lesson-schedule.entity';

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
      id: await this.lessonScheduleService.createLessonSchedule(
        createLessonScheduleDto,
      ),
    });
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update lesson schedule' })
  @ApiResponse({
    status: 200,
    type: LessonSchedule,
  })
  @UsePipes(ValidationPipe)
  async updateLessonSchedule(
    @Param('id') id: string,
    @Body()
    updateLessonScheduleDto: UpdateLessonScheduleDto,
  ): Promise<Record<string, any>> {
    return new CrudResponse().updateResponse({
      id: await this.lessonScheduleService.updateLessonSchedule(
        +id,
        updateLessonScheduleDto,
      ),
    });
  }
}
