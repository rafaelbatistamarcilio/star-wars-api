import { Get, Controller, Post, Body, Param } from '@nestjs/common';
import { PlanetaService } from './planeta.service';
import { Planeta } from './planeta.entity';

@Controller('planetas')
export class PlanetaController {
  constructor(private readonly planetaService: PlanetaService) { }

  @Post()
  async adicionar( @Body() planeta: Planeta ): Promise<Planeta> {
    return await this.planetaService.adicionar(planeta);
  }

  @Get()
  async recuperarPlanetas(): Promise<Planeta[]> {
      return await this.planetaService.recuperarPlanetas();
  }

  @Get(':id')
  async recuperarPorId( @Param('id') id: string): Promise<Planeta> {
    return await this.planetaService.recuperarPorId(id);
  }

  @Get('buscar/:nome')
  async recuperarPorNome( @Param('nome') nome: string): Promise<Planeta[]> {
    return await this.planetaService.recuperarPorNome(nome);
  }
}
