import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';
import { User } from 'src/users/user.entity';
import { Song } from 'src/songs/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, User, Song])],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
