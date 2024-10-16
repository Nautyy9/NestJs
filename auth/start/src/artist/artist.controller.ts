import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDTO } from './dto/artist.dto';
import { Artist } from './artist.entity';

@Controller({ path: 'artists' })
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Post()
  create(
    @Body()
    artistDTO: CreateArtistDTO,
  ): Promise<Artist> {
    return this.artistService.create(artistDTO);
  }

  @Put(':id')
  updateArtist(
    @Param('id', ParseIntPipe) id: number,
    @Body() artistDTO: CreateArtistDTO,
  ): Promise<Artist> {
    return this.artistService.update(id, artistDTO);
  }

  @Get()
  findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Artist> {
    return this.artistService.findOne(id);
  }
}
