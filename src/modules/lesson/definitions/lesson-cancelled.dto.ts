import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsExist } from '@youba/nestjs-dbvalidator';

export class CreateLessonCancelledDto {
  @IsNotEmpty()
  @IsPositive()
  @Validate(IsExist, [{ table: 'lesson_schedule', column: 'id' }])
  @ApiProperty({
    example: 1,
    description: 'Lesson Schedule ID',
    required: true,
  })
  lessonScheduleId: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2022-4-09',
    description: 'Lesson scheduled date',
    required: true,
  })
  lessonScheduledDate: Date;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Cancel all lessons after the specified lesson scheduled date',
    required: false,
  })
  cancelAfter: boolean;
}
