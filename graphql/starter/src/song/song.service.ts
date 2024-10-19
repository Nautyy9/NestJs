import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongInput, Song } from 'src/graphql';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song.dto';
import { UpdateSongDTO } from './dto/update-song.dto';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private songRepo: Repository<Song>,
  ) {}

  async getSongs(): Promise<Song[]> {
    return await this.songRepo.find();
  }
  async getSongById(id: string): Promise<Song> {
    const song = await this.songRepo.findOneByOrFail({ id });
    return song;
  }
  async createSong(createSong: CreateSongInput): Promise<Song> {
    const song = this.songRepo.create(createSong);
    await this.songRepo.save(song);
    return song;
  }

  async updateSong(id, updateSongDTO: UpdateSongDTO): Promise<UpdateResult> {
    return await this.songRepo.update({ id }, updateSongDTO);
  }
  async deleteSong(id: string): Promise<DeleteResult> {
    return await this.songRepo.delete(id);
  }
}
