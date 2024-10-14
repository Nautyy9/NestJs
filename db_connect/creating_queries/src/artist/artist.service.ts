import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { CreateArtistDTO } from './dto/artist.dto';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Artist[]> {
    return this.artistRepository.find({
      relations: ['songs', 'user'],
    });
  }

  async create(artistDTO: CreateArtistDTO): Promise<Artist> {
    const artist = new Artist();
    // artist.name = artistDTO.name;
    const songs = await this.songRepository.find({
      where: { id: In(artistDTO.songs) },
    });

    artist.songs = songs;

    const user = await this.userRepository.findOneBy({ id: artistDTO.user });
    artist.user = user;

    return this.artistRepository.save(artist);
  }

  async update(id: number, artistDTO: CreateArtistDTO): Promise<Artist> {
    const artist = await this.artistRepository.findOne({
      where: { id },
      relations: ['songs', 'user'],
    });
    if (!artist) {
      throw new Error(`Artist with id ${id} not found. Try Creating a new one`);
    }
    const songs = await this.songRepository.find({
      where: { id: In(artistDTO.songs) },
    });

    artist.songs = songs;
    const user = await this.userRepository.findOne({
      where: { id: artistDTO.user },
    });
    if (!user) {
      throw new Error(
        `User with id ${id} not found. Create a new user or select different one `,
      );
    }
    artist.user = user;
    return this.artistRepository.save(artist);
  }
}
