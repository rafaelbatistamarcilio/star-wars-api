import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port: any = process.env.PORT || 3001;
	app.setGlobalPrefix('api');
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.use(cors());
	await app.listen(port);
}
bootstrap();
