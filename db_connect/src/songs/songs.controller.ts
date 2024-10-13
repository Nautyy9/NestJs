import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';

import { Connection } from 'types/types';
import { Song } from './song.entity';
import { CreateSongDTO } from './songs_dto/songs.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDto } from './songs_dto/update_song.dto';

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(` Connection object ${this.connection.url}`);
  }

  @Get()
  findAll(): Promise<Song[]> {
    try {
      return this.songsService.findAll();
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }
  @Post()
  create(@Body() song: CreateSongDTO): Promise<Song> {
    try {
      return this.songsService.create(song);
    } catch (e) {
      throw new HttpException(
        `Sever Error: `,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: e,
        },
      );
    }
  }
  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song> {
    return this.songsService.findOne(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDTO);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }
}
