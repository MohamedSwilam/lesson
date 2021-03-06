import {
  IsNotEmpty,
  IsOptional,
  Length,
  ValidateNested,
  IsPositive,
  Validate,
  IsDate,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateLessonRecurrencePlanDto } from './lesson-recurrence-plan.dto';
import { IsExist } from '@youba/nestjs-dbvalidator';

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

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2022-4-09',
    description: 'Lesson schedule date',
    required: true,
  })
  date: Date;

  @IsOptional()
  @IsPositive()
  @ApiProperty({
    example: 1,
    description: 'Lesson recurrence plan ID',
    required: false,
  })
  @Validate(IsExist, [{ table: 'lesson_recurrence_plan', column: 'id' }])
  lessonRecurrencePlanId?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateLessonRecurrencePlanDto)
  @ApiProperty({
    example: 1,
    description: 'Lesson recurrence plan',
    required: false,
  })
  lessonRecurrencePlan?: CreateLessonRecurrencePlanDto;
}

export class UpdateLessonScheduleDto extends PartialType(
  CreateLessonScheduleDto,
) {}
