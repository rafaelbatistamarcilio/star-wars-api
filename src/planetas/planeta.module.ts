import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planeta } from './planeta.entity';
import { PlanetaController } from './planeta.controller';
import { PlanetaService } from './planeta.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Planeta]),
  ],
  controllers: [PlanetaController],
  providers: [PlanetaService],
})
export class PlanetaModule {
  constructor() {
    Logger.log('INITIALIZING...');
  }
}
