import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryColumn()
  id: string; // uuid

  @Column()
  name: string;

  @Column()
  started_at: Date;

  @Column()
  cancelled_at: Date;

  @Column()
  forecasted_at: Date;

  status;
}
