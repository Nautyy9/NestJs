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
import { SongDTO } from 'src/DTO/song-dto';
import { Connection } from 'types/types';

// @Controller({
//   path: 'songs',
//   scope: Scope.REQUEST,
// })
@Controller('songs')
export class SongsController {
  constructor(
    private songService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
    // connection: Connection, //!-> imported from the service but can't be private
  ) {
    console.log(` Connection object ${this.connection.url}`);
  }

  @Get()
  findAll() {
    return this.songService.findAll();
  }
  @Get(':id')
  // ! transforming the string id to number id with pipe
  findOne(
    @Param(
      'id',
      // ! below will help throw an exception if the id is not convertible to a number ex-> abc
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `Find one with id ${id} with type ${typeof id}`;
  }
  @Post()
  create(@Body() song: SongDTO) {
    try {
      return this.songService.create(song);
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
  @Put(':id')
  update() {
    return 'put ';
  }

  @Delete(':id')
  delete() {
    return 'deleted this song id';
  }
}
