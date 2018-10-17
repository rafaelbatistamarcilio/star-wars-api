import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanetaModule } from './planetas/planeta.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb' as any,
      host: process.env.HEROKU_API_DB_HOST,
      port: process.env.HEROKU_API_DB_PORT,
      username: process.env.HEROKU_API_DB_USER,
      password: process.env.HEROKU_API_DB_PASS,
      database: process.env.HEROKU_API_DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: process.env.HEROKU_API_DB_SSL,
      authSource: 'admin',
    }),
    PlanetaModule,
  ],
})
export class AppModule {
  constructor() {
    Logger.log('INITIALIZING...');
  }
}
