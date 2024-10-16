import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Song, (song) => song.playLists)
  @JoinTable({ name: 'playlists_songs' })
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playLists)
  user: User;
}
