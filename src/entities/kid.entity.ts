import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Kid {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Kid, (kid) => kid.similarKids, {
    cascade: ["insert", "update"],
  })
  @JoinTable()
  similarKids: Kid[];
}
