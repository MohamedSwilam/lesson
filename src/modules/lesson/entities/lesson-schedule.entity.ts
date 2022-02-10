import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  })
  title: string;

  @Column({ type: 'text', nullable: false })
  @ApiProperty({
    example: 'Description',
    description: 'Lesson description',
  })
  description: string;

  @Column({ name: 'lesson_recurrence_plan_id', nullable: true })
  lessonRecurrencePlanId: number;
}
