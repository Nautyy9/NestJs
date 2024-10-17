import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song, SongDocument } from './schemas/song.schema';
import { Model } from 'mongoose';
import { CreateSongDTO } from './dto/create-song.dto';
import { DeleteResult } from 'typeorm';
@Injectable()
export class SongsService {
  constructor(
    @InjectModel(Song.name) //1
    private readonly songModel: Model<SongDocument>, //2
  ) {}

  async getSong(): Promise<Song[]> {
    const song = await this.songModel.find();
    return song;
  }

  async getSongById(id: string): Promise<Song> {
    const song = await this.songModel.findById(id);
    return song;
  }

  async create(createSongDTO: CreateSongDTO): Promise<Song> {
    const song = await this.songModel.create(createSongDTO); //3.
    return song;
  }

  async delete(id: string): Promise<DeleteResult> {
    // mongodb delete doesn't return the data in the required format i.e,
    //delete returns this -> { acknowledged: boolean; deletedCount: number }
    // but the DeleteResult requires {raw: ...} so we have to return this in this format
    const result = await this.songModel.deleteOne({ _id: id });

    return {
      raw: result,
      affected: result.deletedCount || 0,
    };
  }
}
