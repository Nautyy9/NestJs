import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from 'src/playlist/playlist.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { UpdateUserDTO } from './dto/update_user.dto';
import { Enable2FAType } from 'types/types';

import { v4 as uuid } from 'uuid';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Playlist)
    private playlistService: Repository<Playlist>,
  ) {}

  async create(userDto: CreateUserDTO): Promise<User> {
    const user = new User();
    const salt = await bcrypt.genSalt();
    userDto.password = await bcrypt.hash(userDto.password, salt);
    user.firstName = userDto.firstName;
    user.email = userDto.email;
    user.password = userDto.password;
    user.lastName = userDto.lastName;
    user.apiKey = uuid();
    let playlist: Playlist[];
    if (userDto.playLists) {
      playlist = await this.playlistService.find({
        where: {
          id: In(userDto.playLists),
        },
      });
    }
    user.playLists = playlist ?? [];
    await this.userRepo.save(user);
    delete user.password;
    return user;
  }

  findAll(userDto: CreateUserDTO): Promise<User[]> {
    return this.userRepo.find();
  }
  async findOne(data: LoginDTO): Promise<User> {
    const user = await this.userRepo.findOneBy({
      email: data.email,
    });
    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }
    return user;
  }
  delete(id: number): Promise<DeleteResult> {
    return this.userRepo.delete(id);
  }
  async update(id: number, userDto: UpdateUserDTO): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    const salt = await bcrypt.genSalt();
    // ! write the logic to check  if the user is logged in , only then allow these operations
    // if (user.password !== userDto.password) {
    userDto.password = await bcrypt.hash(userDto.password, salt);
    // }
    let playList: Playlist[];
    if (userDto.playLists) {
      playList = await this.playlistService.find({
        where: { id: In(userDto.playLists) },
      });
    }

    user.email = userDto.email ?? user.email;
    user.firstName = userDto.firstName ?? user.firstName;
    user.lastName = userDto.lastName ?? user.lastName;
    user.password = userDto.password;
    user.playLists = playList ?? user.playLists;
    await this.userRepo.save(user);
    delete user.password;
    return user;
  }
  async findOneById(id: number): Promise<User> {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  }

  async updateSecretKey(userId: number, secret: string): Promise<UpdateResult> {
    return this.userRepo.update(
      { id: userId },
      {
        secret: secret,
        enable2FA: true,
      },
    );
  }
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userRepo.update(
      { id: userId },
      { enable2FA: false, secret: null },
    );
  }

  async findByApiKey(apiKey: string): Promise<User> {
    return this.userRepo.findOneBy({ apiKey });
  }
}
