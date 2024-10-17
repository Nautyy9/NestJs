import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsModule } from './songs/songs.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/spotify-clone'),
    SongsModule,
    AlbumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
