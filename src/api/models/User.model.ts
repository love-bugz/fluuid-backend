import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Length, IsAlphanumeric } from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ unique: true })
	emailId: string;

	@Column({ unique: true })
	@IsAlphanumeric()
	@Length(5, 25)
	handle: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt: string;
}
