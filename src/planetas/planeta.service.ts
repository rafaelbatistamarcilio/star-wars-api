import { Injectable, Logger, BadGatewayException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planeta } from './planeta.entity';
import axios from 'axios';
import { PesquisaSW } from './pesquisa-sw.model';
import { PlanetaRepository } from './planeta.repository';

@Injectable()
export class PlanetaService {

  constructor(
    @InjectRepository(PlanetaRepository)
    private readonly planetaRepository: PlanetaRepository) {

  }

  async adicionar(planeta: Planeta): Promise<Planeta> {
    try {
      planeta.filmes = await this.recuperarParticipacoesEmFilmes(planeta.nome, 1);
      const planetaNovo = await this.planetaRepository.save(planeta);
      return this.recuperarPorId(planetaNovo.id);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async editar(planeta: Planeta): Promise<Planeta> {
    try {
      planeta.filmes = await this.recuperarParticipacoesEmFilmes(planeta.nome, 1);
      await this.planetaRepository.atualizar(planeta);
      return await this.planetaRepository.findOne(planeta.id);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async recuperarParticipacoesEmFilmes(nomeDoPlaneta, pagina): Promise<number> {

    try {
      const resposta = await this.consultarApiStarWars(pagina);
      const filme = resposta.results.find(item => item.name.toLocaleLowerCase() === nomeDoPlaneta.toLocaleLowerCase());

      if (filme && filme.films) return filme.films.length;

      if (resposta.next != null) return await this.recuperarParticipacoesEmFilmes(nomeDoPlaneta, pagina + 1);

      return 0;
    } catch (error) {
      Logger.error('Erro ao contabilizar aparições de planetas em filmes');
      Logger.error(error);
    }
  }

  async consultarApiStarWars(pagina: number): Promise<PesquisaSW> {
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
      return await this.planetaRepository.recuperarPorNome(nome);
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
      const entity = await this.planetaRepository.findOne(id);
      if (!entity) {
        throw Error('item id ' + id + ' não encontrado');
      }
      await this.planetaRepository.remove(entity);
    } catch (error) {
      Logger.error(JSON.stringify(error));
      throw new BadGatewayException('item id ' + id + ' não encontrado');
    }
  }

  async atualizar(planeta: Planeta): Promise<Planeta> {
      try {
          return await this.planetaRepository.atualizar(planeta);
      } catch (error) {
          Logger.error(error);
          throw error;
      }
  }

  async limpar(){
    this.planetaRepository.clear();
  }
}
