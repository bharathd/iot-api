import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";
import User from "./user";


@Entity("roles")
export default class UserRole {
  @PrimaryColumn({ name: 'role_id'})
  roleId!: number;

  @Column({ name: 'role_name' })
  roleName!: string;

  @Column({ name: 'is_active' })
  isActive!: boolean;

  @OneToMany(() => User, user => user.role)
  @JoinColumn({ name: 'role_id', referencedColumnName: 'roleId' })
  users!: User[];
}