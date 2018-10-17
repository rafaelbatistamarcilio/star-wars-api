import { PlanetaService } from './planeta.service';

import { Test, TestingModule } from '@nestjs/testing';

describe('Testes da classe PlanetaService', async () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [PlanetaService],
    }).compile();
  });

  describe('MÉTODO: recuperarParticipacoesEmFilmes', async () => {
    it('ao consultar o planeta Alderaan na página 1, deve retornar 2 participações em filmes', async () => {
      const planetaService = app.get<PlanetaService>(PlanetaService);
      const participacoes = await planetaService.recuperarParticipacoesEmFilmes('Alderaan', 1);

      expect(participacoes).toBe(2);
    });
  });
});
