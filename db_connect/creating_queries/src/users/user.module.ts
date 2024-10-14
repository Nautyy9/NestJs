import { Module } from '@nestjs/common';
import { Playlist } from 'src/playlist/playlist.entity';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, User])],
  controllers: [UsersController],
  providers: [UserService],
})
export class UserModule {}
