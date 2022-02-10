import { IsNotEmpty, IsOptional, IsPositive, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLessonScheduleDto {
  @IsNotEmpty()
  @Length(3, 255)
  @ApiProperty({
    example: 'Title',
    description: 'Lesson title',
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @Length(3, 65535)
  @ApiProperty({
    example: 'Description',
    description: 'Lesson description',
    required: true,
  })
  description: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty({
    example: 1,
    description: 'Lesson recurrence plan id',
    required: false,
  })
  lessonRecurrencePlanId?: number;
}

export class UpdateLessonScheduleDto extends PartialType(
  CreateLessonScheduleDto,
) {}
