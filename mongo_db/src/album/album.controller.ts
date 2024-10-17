import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDTO } from './dto/album.dto';
import { Album } from './album_schema/album.schema';

@Controller('albums')
export class AlbumController {
  constructor(private albumService: AlbumService) {}
  @Post()
  create(
    @Body()
    createAlbumDTO: CreateAlbumDTO,
  ): Promise<Album> {
    return this.albumService.createAlbum(createAlbumDTO);
  }
  @Get()
  find(): Promise<Album[]> {
    return this.albumService.findAlbums();
  }
}
