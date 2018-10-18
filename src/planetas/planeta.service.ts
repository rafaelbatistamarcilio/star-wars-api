import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planeta } from './planeta.entity';
import axios from 'axios';

@Injectable()
export class PlanetaService {

  constructor(@InjectRepository(Planeta) private readonly planetaRepository: Repository<Planeta>) {

  }

  async adicionar(planeta: Planeta): Promise<Planeta> {
    try {
      planeta.filmes = await this.recuperarParticipacoesEmFilmes(planeta.nome, 1);
      return await this.planetaRepository.save(planeta);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async recuperarParticipacoesEmFilmes(nomeDoPlaneta, pagina): Promise<number> {

    try {
      const resposta = await this.consultarAparicoes(pagina);
      const filme = resposta.results.find(item => item.name.toLocaleLowerCase() === nomeDoPlaneta.toLocaleLowerCase());

      if (filme && filme.films) return filme.films.length;

      if (resposta.next != null) return await this.recuperarParticipacoesEmFilmes(nomeDoPlaneta, pagina + 1);

      return 0;
    } catch (error) {
      Logger.error('Erro ao contabilizar aparições de planetas em filmes');
      Logger.error(error);
    }
  }

  async consultarAparicoes(pagina: number): Promise<{ next: string, results: [{ name: string, films: string[] }] }> {
    try {
      const response = await axios.get('https://swapi.co/api/planets/?page=' + pagina);
      return response.data;
    } catch (error) {
      Logger.error('Erro ao recuperar planetas na API do STAR WARS');
      Logger.error(error);
    }
  }

  async recuperarPlanetas(): Promise<Planeta[]> {
    try {
      const planetas = await this.planetaRepository.find();
      return planetas;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async recuperarPorNome(nome: string): Promise<Planeta[]> {
    try {
      return await this.planetaRepository
        .createQueryBuilder('planeta')
        .where('nome = :nome')
        .setParameter('nome', nome)
        .getMany();

    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async recuperarPorId(id: string): Promise<Planeta> {
    try {
      return await this.planetaRepository.findOne(id);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async excluir(id: string): Promise<void> {
    try {
      await this.planetaRepository.delete(id);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}
