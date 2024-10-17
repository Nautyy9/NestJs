import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateSongDTO } from './dto/create-song.dto';
import { SongsService } from './songs.service';
import { Song } from './schemas/song.schema';
import { DeleteOneModel } from 'mongoose';
import { DeleteResult } from 'typeorm';
@Controller('songs')
export class SongsController {
  constructor(private songService: SongsService) {}

  @Get()
  find(): Promise<Song[]> {
    return this.songService.getSong();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ): Promise<Song> {
    return this.songService.getSongById(id);
  }

  @Post()
  create(
    @Body()
    createSongDTO: CreateSongDTO,
  ) {
    return this.songService.create(createSongDTO);
  }

  @Delete(':id')
  deleteOne(
    @Param('id')
    id: string,
  ): Promise<DeleteResult> {
    return this.songService.delete(id);
  }
}
