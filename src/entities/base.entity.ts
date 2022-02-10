import { Column, BeforeUpdate, BeforeInsert } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  @ApiProperty({
    example: '2022-02-10 17:00:10.575827',
    description: 'Record creation date',
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  @ApiProperty({
    example: '2022-02-10 17:30:10.575827',
    description: 'Record update date',
  })
  updatedAt: string;

  @BeforeInsert()
  updateCreatedAt() {
    this.createdAt = new Date().toISOString();
  }

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updatedAt = new Date().toISOString();
  }
}
