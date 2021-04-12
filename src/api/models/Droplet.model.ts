import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, Length, IsInt, IsUrl, IsBoolean } from 'class-validator';
import { User } from './User.model';

@Entity('droplets')
export class Droplet extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	@IsString()
	@Length(1, 32)
	title: string;

	@Column()
	@IsUrl()
	audioTrack: string;

	@Column({ type: 'datetime', default: () => 'date("now")' })
	createdAt: string;

	@Column({ type: 'int', default: () => 0 })
	@IsInt()
	upVoteCount: number;

	@Column({ type: 'int', default: () => 0 })
	@IsInt()
	downVoteCount: number;

	@Column({ type: 'int', default: () => 0 })
	@IsInt()
	replyCount: number;

	@Column({ type: 'boolean', default: () => false })
	@IsBoolean()
	isReply: boolean;

	@ManyToOne(() => User, user => user.id)
	@IsString()
	createdByUserId: string;
}
