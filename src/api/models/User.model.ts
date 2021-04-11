import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length, IsAlphanumeric, IsDate } from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: string;

	@Column({ unique: true })
	@IsAlphanumeric()
	@Length(5, 25)
	handle: string;

	@Column()
	@IsDate()
	createdAt: string;

	@Column()
	@IsDate()
	updatedAt: string;
}
