import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from 'src/playlist/playlist.entity';
import { In, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userService: Repository<User>,

    @InjectRepository(Playlist)
    private playlistService: Repository<Playlist>,
  ) {}

  async create(userDto: CreateUserDTO): Promise<User> {
    const user = new User();
    user.firstName = userDto.firstName;
    user.email = userDto.email;
    user.password = userDto.password;
    user.lastName = userDto.lastName;
    const playlist = await this.playlistService.find({
      where: {
        id: In(userDto.playLists),
      },
    });
    user.playLists = playlist;
    return this.userService.save(user);
  }

  findAll(userDto: CreateUserDTO): Promise<User[]> {
    return this.userService.find();
  }
}
