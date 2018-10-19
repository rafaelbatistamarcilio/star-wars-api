import axios from 'axios';

describe('Testes de integração da classe PlanetaController ', () => {

  beforeAll(() => {
    jest.setTimeout(60000);
    if (!process.env.API_AMBIENTE_TST) {
      require('dotenv').config();
    }
  });

  beforeEach(async () => {
    await axios.delete(process.env.API_AMBIENTE_TST + '/api/planetas/limpar');
  });

  afterAll(async () => {
    await axios.delete(process.env.API_AMBIENTE_TST + '/api/planetas/limpar');
  });

  it('Não deve permitir cadastrar planetas sem nome', async () => {
    const planetaSemNome = { clima: 'temperado', terreno: 'Pedra pura' };
    await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planetaSemNome)
      .catch(error => {
        expect(error.response.status).toBe(400);
      });
  });

  it('Não deve permitir cadastrar planetas sem clima', async () => {
    const planetaSemNome = { nome: 'Terra', terreno: 'Pedra pura' };
    await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planetaSemNome)
      .catch(error => {
        expect(error.response.status).toBe(400);
      });
  });

  it('Não deve permitir cadastrar planetas sem terreno', async () => {
    const planetaSemNome = { nome: 'Terra', clima: 'se for no rio é muito quente' };
    await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planetaSemNome)
      .catch(error => {
        expect(error.response.status).toBe(400);
      });
  });

  it('Deve cadastrar planetas sem terreno', async () => {
    const nomeUnico = 'planeta ' + new Date().toISOString();
    const planeta = { nome: nomeUnico, clima: 'se for no rio é muito quente', terreno: 'Pedra pura' };
    const response = await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planeta);
    expect(response.status).toBe(201);
    expect(response.data.nome).toBe(nomeUnico);
  });

  it('Deve editar planetas sem terreno', async () => {
    const nomeUnico = 'planeta ' + new Date().toISOString();
    const planeta = { nome: nomeUnico, clima: 'se for no rio é muito quente', terreno: 'Pedra pura' };
    const response = await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planeta);
    const planetaNovo = response.data;
    planetaNovo.terreno = 'Terreno editado';

    await axios.put(process.env.API_AMBIENTE_TST + '/api/planetas', planetaNovo);
    const responsePesquisa = await axios.get(process.env.API_AMBIENTE_TST + '/api/planetas/' + planetaNovo.id);
    expect(responsePesquisa.status).toBe(200);
    expect(responsePesquisa.data.terreno).toBe(planetaNovo.terreno);
  });

  it('Deve pesquisar planetas por nome corretamente', async () => {
    const nomeUnico = 'planeta ' + new Date().toISOString();
    const planeta = { nome: nomeUnico, clima: 'se for no rio é muito quente', terreno: 'Pedra pura' };
    await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planeta);
    const response = await axios.get(process.env.API_AMBIENTE_TST + '/api/planetas/buscar/' + nomeUnico);
    expect(response.status).toBe(200);
    expect(response.data[0].nome).toBe(nomeUnico);
  });

  it('Deve pesquisar planetas por id corretamente', async () => {
    const nomeUnico = 'planeta ' + new Date().toISOString();
    const planeta = { nome: nomeUnico, clima: 'se for no rio é muito quente', terreno: 'Pedra pura' };
    const response = await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planeta);
    const busca = await axios.get(process.env.API_AMBIENTE_TST + '/api/planetas/' + response.data.id);
    expect(busca.status).toBe(200);
    expect(busca.data.nome).toBe(nomeUnico);
  });

  it('Deve consultar planetas corretamente', async () => {
    const planeta1 = { nome: 'planeta 1 ' + new Date().toISOString(), clima: 'se for no rio é muito quente', terreno: 'Pedra pura' };
    await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planeta1);

    const planeta2 = { nome: 'planeta 2 ' + new Date().toISOString(), clima: 'se for no rio é muito quente', terreno: 'Pedra pura' };
    await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planeta2);

    const response = await axios.get(process.env.API_AMBIENTE_TST + '/api/planetas');
    expect(response.data.length).toBe(2);
  });

  it('Deve excluir planetas corretamente', async () => {
    const nomeUnico = 'planeta ' + new Date().toISOString();
    const planeta = { nome: nomeUnico, clima: 'se for no rio é muito quente', terreno: 'Pedra pura' };
    const response = await axios.post(process.env.API_AMBIENTE_TST + '/api/planetas', planeta);
    const busca = await axios.get(process.env.API_AMBIENTE_TST + '/api/planetas/' + response.data.id);
    expect(busca.status).toBe(200);
    expect(busca.data.nome).toBe(nomeUnico);

    const exclusao = await axios.delete(process.env.API_AMBIENTE_TST + '/api/planetas/' + response.data.id);
    expect(exclusao.status).toBe(200);

    const buscaExcluido = await axios.get(process.env.API_AMBIENTE_TST + '/api/planetas/' + response.data.id);
    expect(buscaExcluido.status).toBe(200);
    expect(buscaExcluido.data).toBe('');
  });
});
