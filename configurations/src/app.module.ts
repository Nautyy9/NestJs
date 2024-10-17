import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './utils/middleware/middleware.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfService } from './utils/providers/service_provider';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayListModule } from './playlist/playlist.module';
import { UserModule } from './users/user.module';
import { ArtistModule } from './artist/artist.module';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { dataSourceOptions, typeOrmAsyncConfig } from 'db/data-source';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
const devConfig = { port: 3000 };
const prodConfig = { port: 4000 };

import { validate } from '../env.validation';
// When you want to use ConfigModule in other modules, you'll need to import it (as is standard with any Nest module).
@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      envFilePath: ['.development.env', '.production.env'],
      // @ with below i will not need to import ConfigModule in other modules
      isGlobal: true,
      load: [configuration],
      validate: validate,
    }),
    AuthModule,
    SongsModule,
    PlayListModule,
    UserModule,
    ArtistModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DevConfService,
      useClass: DevConfService,
    },

    {
      provide: 'CONFIG',
      // useFactory => allows to create dynamic PROVIDERS values ex-> conditions
      useFactory() {
        return process.env.NODE_ENV !== 'production' ? devConfig : prodConfig;
      },
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    console.log('dbName', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    //@ consumer.apply(LoggerMiddleware).forRoutes('songs');
    //! consumer
    //!   .apply(LoggerMiddleware)
    //!   .forRoutes({ path: 'songs', method: RequestMethod.POST });

    consumer.apply(LoggerMiddleware).forRoutes(SongsController);
  }
}
