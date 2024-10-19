import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { Song } from './song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongResolver } from './song.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Song])],
  controllers: [SongController],
  providers: [SongService, SongResolver],
})
export class SongModule {}
