import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { In, Repository, UpdateResult } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreatePlayListDto } from './dto/playlist.dto';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(playlistDTO: CreatePlayListDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playlistDTO.name;
    const songs = await this.songRepository.find({
      where: { id: In(playlistDTO.songs) },
    });

    playlist.songs = songs;

    const user = await this.userRepository.findOneBy({
      id: playlistDTO.user as number,
    });
    playlist.user = user;

    return this.playlistRepository.save(playlist);
  }

  findAll(): Promise<Playlist[]> {
    return this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.songs', 'songs')
      .leftJoinAndSelect('playlist.user', 'user')
      .orderBy('playlist.id', 'ASC')
      .addOrderBy('songs.id', 'ASC')
      .addOrderBy('user.id', 'DESC')
      .getMany();
  }

  async update(id: number, playlistDTO: CreatePlayListDto): Promise<Playlist> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['songs', 'user'],
    });
    playlist.name = playlistDTO.name;
    if (!playlist) {
      throw new Error(`Playlist with id ${id} not found`);
    }
    const songs = await this.songRepository.findBy({
      id: In(playlistDTO.songs),
    });

    playlist.songs = songs;

    const user = await this.userRepository.findOneBy({ id: playlistDTO.user });
    if (!user) {
      throw new Error(`User with id ${playlistDTO.user} not found`);
    }
    playlist.user = user;
    return this.playlistRepository.save(playlist);
  }
}
