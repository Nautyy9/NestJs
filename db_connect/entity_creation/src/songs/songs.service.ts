import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './songs_dto/songs.dto';
import { UpdateSongDto } from './songs_dto/update_song.dto';

// import { Connection } from 'types/types';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  create(SongDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = SongDTO.title;
    song.artists = SongDTO.artists;
    song.duration = SongDTO.duration;
    song.lyrics = SongDTO.lyrics ?? null;
    song.releasedDate = SongDTO.releasedDate;

    return this.songsRepository.save(song);
  }
  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  remove(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }
}
