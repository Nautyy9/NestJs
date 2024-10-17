import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { SeedService } from './seed/seed.service';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('port'));
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  // if (module.hot) {
  //   module.hot.accept();
  //   module.hot.dispose(() => app.close());
  // }

  // const shutdown = async () => {
  //   console.log('Closing server...');
  //   await app.close(); // Ensure the port is released
  //   process.exit(0); // Exit process
  // };

  // process.on('SIGINT', shutdown); // Handle Ctrl+C
  // process.on('SIGTERM', shutdown);
  // console.log();
}
bootstrap();
