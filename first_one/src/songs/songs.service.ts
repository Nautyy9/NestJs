import { Injectable, Scope } from '@nestjs/common';
import { SongDTO } from 'src/DTO/song-dto';
// import { Connection } from 'types/types';

// @Injectable({
//   scope: Scope.TRANSIENT,
// })
@Injectable()
export class SongsService {
  // @Inject('CONNECTION')
  // connection: Connection;
  private readonly songs = [];

  create(song: SongDTO) {
    this.songs.push(song);
    return this.songs;
  }

  findAll() {
    return this.songs;
  }
}
