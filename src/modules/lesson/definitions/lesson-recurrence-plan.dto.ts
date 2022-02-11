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
    required: false,
  })
  saturday?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on sunday',
    required: false,
  })
  sunday?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on monday',
    required: false,
  })
  monday?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on tuesday',
    required: false,
  })
  tuesday?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on wednesday',
    required: false,
  })
  wednesday?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on thursday',
    required: false,
  })
  thursday?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence weekly on friday',
    required: false,
  })
  friday?: boolean;

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
