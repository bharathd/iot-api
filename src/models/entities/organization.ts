import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from './user';


@Entity('organization_config')
export class OrganizationConfig {
  @PrimaryColumn({ name: 'organization_id' })
  organizationId!: string;

  @Column({ name: 'logo' })
  logo!: string;

  @Column({ name: 'background_image' })
  backgroundImage!: string;

  @Column({ name: 'primary_color' })
  primaryColor!: string;

  @Column({ name: 'secondary_color' })
  secondaryColor!: string;

  @Column({ name: 'welcome_title' })
  welcomeTitle!: string;

  @Column({ name: 'welcome_captions' })
  welcomeCaptions!: string;

  @Column({ name: 'website_url' })
  websiteUrl!: string;
}

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

  @Column({ name: 'description' })
  description!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ name: 'created_date' })
  createdDate!: number;

  @OneToMany(() => User, user => user.organizationId)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'organizationId' })
  users!: User[];

  @OneToOne(() => OrganizationConfig, config => config.organizationId)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'organizationId' })
  config!: OrganizationConfig;
}