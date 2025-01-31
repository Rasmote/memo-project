import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class MemoEntity {
    @PrimaryGeneratedColumn()
    num: number;

    @Column()
    title: string;

    @Column()
    content: string;
}