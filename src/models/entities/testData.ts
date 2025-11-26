import { Entity, PrimaryGeneratedColumn, Column, AfterLoad } from 'typeorm';

@Entity("test_data")
export class TestData {
  @PrimaryGeneratedColumn({ name: "Id" })
  id!: number;

  @Column({ name: "Name" })
  name!: string;

  @Column({ name: "Value" })
  value!: number;

  @Column({ name: "Timestamp", type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  // @OneToMany(() => DealParty, dealParty => dealParty.deal)
  // @JoinColumn({ name: "DealSummaryId", referencedColumnName: "dealSummaryId" }) 
  // dealPartyList!: DealParty[];

  // @ManyToOne(() => Stage, stg => stg.stage)
  // stageData!: Stage;

  @AfterLoad()
  setValues() {
    if (this.timestamp) {
      this.timestamp = new Date(this.timestamp);
    }
  }
}
