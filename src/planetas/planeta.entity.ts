import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Planeta {

    @ObjectIdColumn()
    id: number;

    @Column({ type: 'text', length: 50 })
    public nome: string;

    @Column({ type: 'text', length: 100 })
    public clima: string;

    @Column({ type: 'text', length: 100 })
    public terreno: string;

    @Column({ type: 'number'})
    public filmes: number;

    constructor(nome, clima, terreno, filmes) {
        this.nome = nome;
        this.clima = clima;
        this.terreno = terreno;
        this.filmes = filmes;
    }
}