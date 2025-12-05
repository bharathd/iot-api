import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Organization from "./organization";


@Entity('customers')
export default class Customer {
  @PrimaryGeneratedColumn('uuid', { name: 'customer_id' })
  customerId!: string;

  @Column({ name: 'organization_id' })
  organizationId!: string;

  @Column({ name: 'customer_name' })
  customerName!: string;

  @Column({ name: 'mobile_number' })
  mobileNumber!: string;

  @Column({ name: 'hid' })
  hid!: string;

  @Column({ name: 'mac_address' })
  macAddress!: string;

  @Column({ name: 'ip_address' })
  ipAddress!: string;

  @Column({ name: 'otp_code' })
  otpCode!: string;

  @Column({ name: 'otp_generated_date' })
  otpGeneratedDate!: number;

  @Column({ name: 'is_otp_verified', default: false })
  isOtpVerified!: boolean;

  @Column({ name: 'otp_resend_count', default: 0 })
  otpResendCount!: number;

  @Column({ name: 'otp_verification_attempts', default: 0 })
  otpVerificationAttempts!: number;

  @Column({ name: 'fas_token' })
  fasToken!: string;

  @Column({ name: 'origin_url' })
  originUrl!: string;

  @Column({ name: 'gateway_address' })
  gatewayAddress!: string;

  @Column({ name: 'is_active', default: true })
  isActive!: boolean;

  @Column({ name: 'created_date' })
  createdDate!: number;

  @ManyToOne(() => Organization, organization => organization.organizationId)
  @JoinColumn({ name: 'organization_id', referencedColumnName: 'organizationId' })
  organization!: Organization;

}