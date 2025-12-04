import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Organization from "./organization";
import UserRole from "./role";

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId!: string;

  @Column({ name: 'organization_id' })
  organizationId!: string;

  @Column({ name: 'role_id' })
  roleId!: number;

  @Column({ name: 'full_name' })
  fullName!: string;

  @Column({ name: 'contact_number' })
  contactNumber!: string;

  @Column({ name: 'email' })
  email!: string;

  @Column({ name: 'password' })
  password!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ name: 'created_date' })
  createdDate!: number;

  @ManyToOne(() => Organization, organization => organization.users)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'organizationId' })
  organization!: Organization;

  @ManyToOne(() => UserRole, role => role.users)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'roleId' })
  role!: UserRole;
}