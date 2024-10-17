import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './songs_dto/songs.dto';
import { UpdateSongDto } from './songs_dto/update_song.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artist/artist.entity';

// import { Connection } from 'types/types';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(SongDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = SongDTO.title;
    song.artists = SongDTO.artists;
    song.duration = SongDTO.duration;
    song.lyrics = SongDTO.lyrics ?? null;
    song.releasedDate = SongDTO.releasedDate;

    const artist = await this.artistsRepository.find({
      where: { id: In(SongDTO.artists) },
    });

    song.artists = artist;

    return this.songsRepository.save(song);
  }
  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song> {
    return this.songsRepository.findOneBy({ id });
  }

  remove(id: string): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }

  async update(
    id: number,
    recordToUpdate: UpdateSongDto,
  ): Promise<UpdateResult> {
    const song = await this.songsRepository.findOneBy({ id });
    // song.artists = recordToUpdate.artists;
    song.lyrics = recordToUpdate.lyrics;
    song.duration = recordToUpdate.duration;
    song.releasedDate = recordToUpdate.releasedDate;
    song.title = recordToUpdate.title;
    // song.playList = recordToUpdate.playList;

    return this.songsRepository.update(id, song);
  }
  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    //@ Repository.QueryBuilder ->  Creates a new query builder that can be used to build a SQL query.where "c" is the alias for the table having all the records||columns

    const queryBuilder = this.songsRepository.createQueryBuilder('c');

    // @ writing a query
    queryBuilder.orderBy('c.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }
}
