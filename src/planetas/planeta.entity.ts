import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Planeta {

    @ObjectIdColumn()
    id: string;

    @IsNotEmpty()
    @Column({ type: 'text', length: 50 })
    public nome: string;

    @IsNotEmpty()
    @Column({ type: 'text', length: 100 })
    public clima: string;

    @IsNotEmpty()
    @Column({ type: 'text', length: 100 })
    public terreno: string;

    @Column({ type: 'number'})
    public filmes: number;
}