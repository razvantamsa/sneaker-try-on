import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { SneakerModel } from '../../../sneakerSvc/src/sneakers/sneaker.model';

@ObjectType()
@Entity({ name: 'brand' })
export class BrandModel {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column('varchar', { length: 255, name: 'name', nullable: true })
  name?: string;

  @Field({ nullable: false })
  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
    name: 'created_at',
  })
  createdAt: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    name: 'updated_at',
  })
  updatedAt: Date;

  @Field(() => SneakerModel, { nullable: true })
  @ManyToOne(() => SneakerModel, (sneaker) => sneaker.brand, {
    cascade: true,
  })
  sneaker: SneakerModel;
}
