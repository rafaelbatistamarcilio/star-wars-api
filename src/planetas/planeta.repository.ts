import { Injectable, Logger } from '@nestjs/common';
import { Repository, EntityRepository, FindConditions } from 'typeorm';
import { Planeta } from './planeta.entity';

@EntityRepository(Planeta)
export class PlanetaRepository extends Repository<Planeta> {

    constructor() {
        super();
    }

    async salvar(planeta: Planeta): Promise<Planeta> {
        try {
            return await this.save(planeta);
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    async recuperarPorNome(nome: string): Promise<Planeta[]> {
        try {
            const planeta = new Planeta();
            planeta.nome = nome;
            // tslint:disable-next-line:no-console
            console.log(planeta);
            const busca = await this.find( planeta );
            return busca;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }

    async atualizar(planeta: Planeta): Promise<Planeta> {
        try {

            const planetaAntigo = await this.findOne(planeta.id);

            if (!planetaAntigo) {
                throw Error('Planeta com id ' + planeta.id + ' não encontrado');
            }

            Object.keys(planetaAntigo).forEach(propriedade => planetaAntigo[propriedade] = planeta[propriedade]);
            await this.update(planetaAntigo.id, planetaAntigo);

            return planetaAntigo;
        } catch (error) {
            Logger.error(error);
            throw error;
        }
    }
}
