import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Param,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LessonScheduleService } from '../../services/lesson-schedule/lesson-schedule.service';
import {
  CreateLessonScheduleDto,
  UpdateLessonScheduleDto,
} from '../../definitions/lesson-schedule.dto';
import { CrudResponse } from '../../../../responses/crud.response';

@ApiTags('lesson-schedules')
@Controller('lesson-schedules')
export class LessonScheduleController {
  constructor(private readonly lessonScheduleService: LessonScheduleService) {}

  @Get('/:id')
  @ApiOperation({
    summary: 'Browse lesson schedules',
    description:
      'API to fetch all lessons of a specific schedule ordered by date ascending',
  })
  @ApiResponse({
    status: 200,
    type: CrudResponse,
  })
  @UsePipes(ValidationPipe)
  async browseLessonSchedule(
    @Param('id') id: string,
  ): Promise<Record<string, any>> {
    return new CrudResponse().browseResponse([
      await this.lessonScheduleService.view(+id),
    ]);
  }
  @Post()
  @ApiOperation({
    summary: 'Create lesson schedule',
    description:
      'API to save lessons by saving only lesson info & the recurrence plan',
  })
  @ApiResponse({
    status: 201,
    type: CrudResponse,
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
  @ApiOperation({
    summary: 'Update lesson schedule',
    description: 'API to update lesson and recurrence plan',
  })
  @ApiResponse({
    status: 200,
    type: CrudResponse,
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
