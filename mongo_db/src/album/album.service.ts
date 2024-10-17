import { Injectable } from '@nestjs/common';
import { Album, AlbumDocument } from './album_schema/album.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Song } from 'src/songs/schemas/song.schema';
import { CreateAlbumDTO } from './dto/album.dto';

@Injectable()
export class AlbumService {
  constructor(
    @InjectModel(Album.name)
    private readonly albumModel: Model<AlbumDocument>,
  ) {}
  async createAlbum(createAlbumDTO: CreateAlbumDTO): Promise<Album> {
    return this.albumModel.create(createAlbumDTO);
  }
  async findAlbums(): Promise<Album[]> {
    return this.albumModel.find().populate('songs', null, Song.name); //1
  }
}
