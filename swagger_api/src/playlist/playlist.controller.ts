import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDto } from './dto/playlist.dto';
import { Playlist } from './playlist.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('playlists')
@Controller({
  path: 'playlists',
})
export class PlaylistController {
  constructor(private playlistService: PlaylistService) {}

  @Post()
  create(
    @Body()
    playlistDTO: CreatePlayListDto,
  ): Promise<Playlist> {
    return this.playlistService.create(playlistDTO);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() playlistDTO: CreatePlayListDto,
  ): Promise<Playlist> {
    return this.playlistService.update(id, playlistDTO);
  }

  @Get()
  findAll(): Promise<Playlist[]> {
    return this.playlistService.findAll();
  }
}
