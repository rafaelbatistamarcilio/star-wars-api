import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: any = process.env.PORT || 3001;
  app.setGlobalPrefix('api');
  app.use(cors());
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
