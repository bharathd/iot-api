import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('browsing_logs')
export default class BrowsingLog {
  @PrimaryColumn({ name: 'log_id' })
  logId!: number;

  @Column({ name: 'customer_id' })
  customerId!: string;

  @Column({ name: 'organization_id' })
  organizationId!: string;

  @Column({ name: 'access_time', default: () => 'CURRENT_TIMESTAMP' })
  accessTime!: Date;

  @Column({ name: 'url' })
  url!: string;
}