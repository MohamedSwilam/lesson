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
export class LessonException extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Lesson exception id',
  })
  id: number;

  @Column({ type: 'date', nullable: false, name: 'scheduled_date' })
  @ApiProperty({
    example: '2022-4-09',
    description: 'Scheduled date',
  })
  scheduledDate: Date;

  @Column({ type: 'date', nullable: true, name: 'new_date' })
  @ApiProperty({
    example: '2022-5-09',
    description: 'Scheduled date',
  })
  newDate: Date;

  @Column({ type: 'text', nullable: true, name: 'new_title' })
  @ApiProperty({
    example: 'Description',
    description: 'New lesson title',
  })
  newTitle: string;

  @Column({ type: 'text', nullable: true, name: 'new_description' })
  @ApiProperty({
    example: 'Description',
    description: 'New lesson description',
  })
  newDescription: string;

  @Column({ type: 'int', nullable: true, name: 'lesson_schedule_id' })
  @ApiProperty({
    example: 1,
    description: 'Lesson schedule ID',
  })
  lessonScheduleId: number;

  @ManyToOne(
    () => LessonSchedule,
    (lessonSchedule) => lessonSchedule.lessonException,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'lesson_schedule_id' })
  lessonSchedule: LessonSchedule;
}
