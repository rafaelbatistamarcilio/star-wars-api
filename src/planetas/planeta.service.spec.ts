import { PesquisaSW } from './pesquisa-sw.model';
import { PlanetaService } from './planeta.service';

import { PlanetaRepository } from './planeta.repository';

describe('Testes unitários da classe PlanetaService', () => {
  let planetaService: PlanetaService;

  beforeEach(async () => {
    const repository: PlanetaRepository = null;
    planetaService = new PlanetaService(repository);
  });

  describe('MÉTODO: recuperarParticipacoesEmFilmes', () => {

    it('ao consultar o planeta Alderaan na página 1, deve retornar 2 participações em filmes', async () => {
      const pesquisaSw: PesquisaSW = new PesquisaSW();
      pesquisaSw.results = new Array<{ name: string, films: string[] }>();
      pesquisaSw.results.push({ name: 'Terra', films: ['filme 1', 'filme 2', 'filme 3']});
      pesquisaSw.results.push({ name: 'Alderaan', films: ['filme 1', 'filme 2']});

      jest.spyOn(planetaService, 'consultarApiStarWars').mockImplementation(() => pesquisaSw);

      const participacoes = await planetaService.recuperarParticipacoesEmFilmes('Alderaan', 1);
      expect(participacoes).toBe(2);
    });
  });

  describe('MÉTODO: consultarApiStarWars', () => {

    it('ao consultar a API SW na página 1, deve retornar 10 planetas', async () => {
      const participacoes = await planetaService.consultarApiStarWars(1);
      expect(participacoes.results.length).toBe(10);
    });
  });
});
