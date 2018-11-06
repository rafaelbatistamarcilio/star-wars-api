import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class DataSource {

    static config(): TypeOrmModuleOptions {
        return {
            type: 'mongodb' as any,
            host: process.env.HEROKU_API_DB_HOST,
            port: process.env.HEROKU_API_DB_PORT,
            username: process.env.HEROKU_API_DB_USER,
            password: process.env.HEROKU_API_DB_PASS,
            database: process.env.HEROKU_API_DB_NAME,
            ssl: process.env.HEROKU_API_DB_SSL,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
            authSource: 'admin', extra: { useNewUrlParser: true },
          };
    }
}