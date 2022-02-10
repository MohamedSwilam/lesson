import {
  IsNotEmpty,
  IsOptional,
  Length,
  IsBoolean,
  ValidateNested,
  IsDate, IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLessonRecurrencePlanDto {
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence plan type daily or weekly',
    required: true,
  })
  isDaily: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on saturday',
    required: true,
  })
  saturday: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on sunday',
    required: true,
  })
  sunday: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on monday',
    required: true,
  })
  monday: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on tuesday',
    required: true,
  })
  tuesday: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on wednesday',
    required: true,
  })
  wednesday: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on thursday',
    required: true,
  })
  thursday: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on friday',
    required: true,
  })
  friday: boolean;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2022-4-09',
    description: 'Lesson recurrence end date',
    required: true,
  })
  endDate: Date;
}

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
    description: 'Lesson recurrence plan ID',
    required: true,
  })
  lessonRecurrencePlanId: number;

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
