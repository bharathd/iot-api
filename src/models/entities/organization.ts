import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user';

@Entity('organizations')
export default class Organization {
  @PrimaryGeneratedColumn('uuid', { name: 'organization_id' })
  organizationId!: string;

  @Column({ name: 'organization_type' })
  organizationType!: string;

  @Column({ name: 'organization_name' })
  organizationName!: string;

  @Column({ name: 'contact_person' })
  contactPerson!: string;

  @Column({ name: 'contact_number', length: 20 })
  contactNumber!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'address' })
  address!: string;

  @Column({ name: 'organization_logo' })
  organizationLogo!: string;

  @Column({ name: 'description' })
  description!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ name: 'created_date' })
  createdDate!: number;

  @OneToMany(() => User, user => user.organizationId)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'organizationId' })
  users!: User[];
}