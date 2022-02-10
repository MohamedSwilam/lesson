import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LessonSchedule } from './lesson-schedule.entity';

@Entity()
export class LessonCancelled extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Lesson cancelled id',
  })
  id: number;

  @Column({ type: 'date', nullable: false, name: 'lesson_scheduled_date' })
  @ApiProperty({
    example: '2022-5-09',
    description: 'Lesson scheduled date',
  })
  lessonScheduledDate: Date;

  @Column({ type: 'boolean', default: false, name: 'cancel_after' })
  @ApiProperty({
    example: true,
    description: 'Cancel all lessons after the specified lesson scheduled date',
  })
  cancelAfter: boolean;

  @Column({ type: 'int', nullable: true, name: 'lesson_schedule_id' })
  @ApiProperty({
    example: 1,
    description: 'Lesson schedule ID',
  })
  lessonScheduleId: number;

  @ManyToOne(
    () => LessonSchedule,
    (lessonSchedule) => lessonSchedule.lessonCancelled,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'lesson_schedule_id' })
  lessonSchedule: LessonSchedule;
}
