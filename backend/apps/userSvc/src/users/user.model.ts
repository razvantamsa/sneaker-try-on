import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'users' })
export class UserModel {
  @Field({ nullable: false })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column('varchar', { length: 255, name: 'first_name', nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  @Column('varchar', { length: 255, name: 'last_name', nullable: true })
  lastName?: string;

  @Field({ nullable: false })
  @Column('varchar', { length: 255 })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

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

  @Field({ nullable: true })
  @Column('boolean', {
    default: false,
    nullable: true,
    name: 'wantsNewsletter',
  })
  wantsNewsletter?: boolean;

  @Field({ nullable: true })
  @Column('text', { nullable: true, name: 'avatar_url' })
  avatarUrl?: string;

  @Field({ nullable: true })
  @Column('boolean', { default: false, nullable: true, name: 'is_admin' })
  isAdmin?: boolean;
}
