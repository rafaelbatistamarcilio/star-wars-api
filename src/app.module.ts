import { DataSource } from './datasource';
import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetaModule } from './planetas/planeta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot( DataSource.config() ),
    PlanetaModule,
  ],
})
export class AppModule {
  constructor() {
    Logger.log('INITIALIZING...');
  }
}
