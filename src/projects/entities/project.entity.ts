import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';
export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}
@Entity()
export class Project {
  @PrimaryColumn()
  id: string; // uuid

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, type: 'datetime' })
  started_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  finished_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  cancelled_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  forecasted_at: Date | null;

  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      cancelled_at?: Date | null;
      forecasted_at?: Date | null;
      // status?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();

    if (props?.started_at) {
      this.start(props.started_at);
    }
  }

  start(started_at: Date) {
    // started_at
    if (this.status === ProjectStatus.Active) {
      throw new Error('Projeto já iniciado.');
    }
    if (this.status == ProjectStatus.Completed) {
      throw new Error('Projeto já completo.');
    }

    if (this.status == ProjectStatus.Cancelled) {
      throw new Error('Projeto já cancelado.');
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }
}
