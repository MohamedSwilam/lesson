import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsExist } from '@youba/nestjs-dbvalidator';

export class CreateLessonExceptionDto {
  @IsNotEmpty()
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
  scheduledDate: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2022-4-09',
    description: 'Lesson new date',
    required: false,
  })
  newDate?: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'New Title',
    description: 'Lesson new title',
    required: false,
  })
  @Length(3, 255)
  newTitle?: string;

  @IsOptional()
  @IsString()
  @Length(3, 255)
  @ApiProperty({
    example: 'New Description',
    description: 'Lesson new description',
    required: false,
  })
  newDescription?: string;
}
