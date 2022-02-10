import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { LessonRecurrencePlan } from './lesson-recurrence-plan.entity';
import { LessonException } from './lesson-exception.entity';
import { LessonCancelled } from './lesson-cancelled.entity';

@Entity()
export class LessonSchedule extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Lesson schedule id',
  })
  id: number;

  @Column({ nullable: false })
  @ApiProperty({
    example: 'Title',
    description: 'Lesson title',
    required: true,
  })
  title: string;

  @Column({ type: 'text', nullable: false })
  @ApiProperty({
    example: 'Description',
    description: 'Lesson description',
    required: true,
  })
  description: string;

  @Column({ type: 'int', nullable: true, name: 'lesson_recurrence_plan_id' })
  @ApiProperty({
    example: 1,
    description: 'Lesson recurrence plan ID',
    required: false,
  })
  lessonRecurrencePlanId: number;

  @ManyToOne(
    () => LessonRecurrencePlan,
    (lessonRecurrencePlan) => lessonRecurrencePlan.lessonSchedule,
    {
      nullable: true,
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'lesson_recurrence_plan_id' })
  lessonRecurrencePlan: LessonRecurrencePlan;

  @OneToMany(
    () => LessonException,
    (lessonException) => lessonException.lessonScheduleId,
    {
      onDelete: 'CASCADE',
    },
  )
  lessonException: LessonException[];

  @OneToMany(
    () => LessonCancelled,
    (lessonCancelled) => lessonCancelled.lessonScheduleId,
    {
      onDelete: 'CASCADE',
    },
  )
  lessonCancelled: LessonCancelled[];
}
