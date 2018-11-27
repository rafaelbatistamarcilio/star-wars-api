import { Get, Controller, Post, Body, Param, Delete, Put, Response, Inject } from '@nestjs/common';
import { PlanetaService } from './planeta.service';
import { Planeta } from './planeta.entity';

@Controller('planetas')
export class PlanetaController {

  @Inject()
  private readonly planetaService: PlanetaService;

  @Post()
  async adicionar(@Body() planeta: Planeta): Promise<Planeta> {
    return await this.planetaService.adicionar(planeta);
  }

  @Put()
  async editar(@Body() planeta: Planeta): Promise<Planeta> {
    return await this.planetaService.editar(planeta);
  }

  @Get()
  async recuperarPlanetas(): Promise<Planeta[]> {
    const planetas = await this.planetaService.recuperarPlanetas();
    return planetas;
  }

  @Get(':id')
  async recuperarPorId(@Param('id') id: string): Promise<Planeta> {
    return await this.planetaService.recuperarPorId(id);
  }

  @Get('buscar/:nome')
  async recuperarPorNome(@Param('nome') nome: string): Promise<Planeta[]> {
    return await this.planetaService.recuperarPorNome(nome);
  }

  @Delete('limpar')
  async limpar(@Response() res): Promise<any> {
    await this.planetaService.limpar();
    return res.status(200).send();
  }

  @Delete(':id')
  async excluir(@Param('id') id: string, @Response() res): Promise<any> {
    await this.planetaService.excluir(id);
    return res.status(200).send();
  }
}
