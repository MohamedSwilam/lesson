import { IsNotEmpty, IsOptional, IsBoolean, IsDate } from 'class-validator';
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

export class UpdateLessonRecurrencePlanDto extends PartialType(
  CreateLessonRecurrencePlanDto,
) {}
