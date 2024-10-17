import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './utils/middleware/middleware.middleware';
import { SongsController } from './songs/songs.controller';
import { DevConfService } from './utils/providers/service_provider';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlayListModule } from './playlist/playlist.module';
// import { Song } from './songs/song.entity';
// import { Artist } from './artist/artist.entity';
// import { User } from './users/user.entity';
// import { Playlist } from './playlist/playlist.entity';
import { UserModule } from './users/user.module';
import { ArtistModule } from './artist/artist.module';
// import { AuthController } from './auth/auth.controller';
// import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import { dataSourceOptions } from 'db/data-source';
import { DataSource } from 'typeorm';
const devConfig = { port: 3000 };
const prodConfig = { port: 4000 };

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
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
