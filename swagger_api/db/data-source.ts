import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Artist } from 'src/artist/artist.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: config.get<string>('db_host'),
      port: config.get<number>('db_port'),
      username: config.get<string>('db_username'),
      password: config.get<string>('db_password'),
      database: config.get<string>('db_name'),
      entities: [Song, Artist, User, Playlist], //1
      synchronize: true, // 2
      // migrations: ['dist/db/migrations/*.js'], // 3
    };
  },
};

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Nautyy9',
  database: 'n-test',
  entities: ['dist/**/*.entity.js'], //1
  synchronize: false, // 2
  migrations: ['dist/db/migrations/*.js'], // 3
};
const dataSource = new DataSource(dataSourceOptions); //4
export default dataSource;
