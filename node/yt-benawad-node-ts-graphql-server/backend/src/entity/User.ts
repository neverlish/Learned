import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class User {

	@PrimaryGeneratedColumn() id: number

	@Column({ type: 'text', unique: true })
	email: string

	@Column({ type: 'bool', default: false })
	confirmed: string

	@Column({ type: 'varchar', length: '230' })
	firstName: string

	@Column({ type: 'text' }) lastName: string

	@Column('text') age: number

}
