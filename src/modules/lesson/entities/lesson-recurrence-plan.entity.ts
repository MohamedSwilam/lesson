import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LessonSchedule } from './lesson-schedule.entity';

@Entity()
export class LessonRecurrencePlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Lesson recurrence plan id',
  })
  id: number;

  @Column({ type: 'boolean', default: true })
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence plan daily or weekly',
  })
  is_daily: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence plan weekly on saturday',
  })
  saturday: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence plan weekly on sunday',
  })
  sunday: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence plan weekly on monday',
  })
  monday: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence plan weekly on tuesday',
  })
  tuesday: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence plan weekly on wednesday',
  })
  wednesday: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence plan weekly on thursday',
  })
  thursday: boolean;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({
    example: true,
    description: 'Lesson recurrence plan weekly on friday',
  })
  friday: boolean;

  @Column({ type: 'date', nullable: false, name: 'end_date' })
  @ApiProperty({
    example: '2022-03-10',
    description: 'Recurrence end date',
  })
  endDate: Date;

  @OneToMany(
    () => LessonSchedule,
    (lessonSchedule) => lessonSchedule.lessonRecurrencePlanId,
    {
      cascade: ['insert', 'update'],
      onDelete: 'CASCADE',
    },
  )
  lessonSchedule: LessonSchedule[];
}
