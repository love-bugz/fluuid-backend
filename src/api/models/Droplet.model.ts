import { BaseEntity, BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, Length, IsUrl, IsBoolean } from 'class-validator';
import { User } from './User.model';

@Entity('droplets')
export class Droplet extends BaseEntity {
	@BeforeInsert()
	init() {
		this.upVoteCount = 0;
		this.downVoteCount = 0;
		this.replyCount = 0;
	}

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

	@Column()
	upVoteCount: number;

	@Column()
	downVoteCount: number;

	@Column()
	replyCount: number;

	@Column()
	@IsBoolean()
	isReply: boolean;

	@ManyToOne(() => User, user => user.id)
	@IsString()
	createdByUser: string;
}
