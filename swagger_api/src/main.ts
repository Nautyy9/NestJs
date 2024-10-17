import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { SeedService } from './seed/seed.service';

// declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  // const seedService = app.get(SeedService);
  // await seedService.seed();

  const config = new DocumentBuilder()
    .setTitle('Spotify Clone')
    .setDescription('Creating Spotify Clone with NestJs app')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // We will use this Bearer Auth with the JWT-auth name on the controller function
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'Bearer',
        name: 'Bearer',
        description: 'Enter Api token',
        in: 'header',
      },
      'bearer-auth', // We will use this Bearer Auth with the JWT-auth name on the controller function
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get<number>('port'));

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
