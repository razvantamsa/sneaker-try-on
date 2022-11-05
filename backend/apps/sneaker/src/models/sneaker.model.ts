import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { BrandModel } from './brand.model';

@ObjectType()
@Entity({ name: 'sneaker' })
export class SneakerModel {
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

  @Column({ name: 'brand_id' })
  brandId: string;

  @Field(() => BrandModel, { nullable: true })
  @ManyToOne(() => BrandModel, (brand) => brand.sneaker, {})
  @JoinColumn({ name: 'brand_id' })
  brand: BrandModel;
}
