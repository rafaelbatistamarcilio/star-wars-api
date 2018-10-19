import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Planeta } from './planeta.entity';
import { PlanetaController } from './planeta.controller';
import { PlanetaService } from './planeta.service';
import { PlanetaRepository } from './planeta.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planeta, PlanetaRepository]),
  ],
  controllers: [PlanetaController],
  providers: [
    PlanetaService,
    {
      provide: getRepositoryToken(Planeta),
      useValue: {},
    },
  ],
})
export class PlanetaModule {
}
