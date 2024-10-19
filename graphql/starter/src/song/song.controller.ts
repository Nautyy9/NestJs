import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Song } from './song.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDTO } from './dto/update-song.dto';
import { SongService } from './song.service';
@Controller('songs')
export class SongController {
  constructor(private songService: SongService) {}
  @Get()
  getSongs(): Promise<Song[]> {
    return this.songService.getSongs();
  }
  @Get(':id')
  getSong(
    @Param('id')
    id: string,
  ): Promise<Song> {
    return this.songService.getSongById(id);
  }

  @Post()
  createSong(
    @Body()
    createSongDTO: CreateSongDTO,
  ): Promise<Song> {
    return this.songService.createSong(createSongDTO);
  }

  @Put(':id')
  updateSong(
    @Param('id')
    id: string,
    @Body()
    updateSongDTO: UpdateSongDTO,
  ): Promise<UpdateResult> {
    return this.songService.updateSong(id, updateSongDTO);
  }

  @Delete(':id')
  deleteSong(
    @Param('id')
    id: string,
  ): Promise<DeleteResult> {
    return this.songService.deleteSong(id);
  }
}
