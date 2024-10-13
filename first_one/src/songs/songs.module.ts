import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/utils/connection/connect_object';

// const mockSongService = {
//   findAll() {
//     return 'From mock service provider ';
//   },
// };

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    // {
    //   //! provide will assign the type which is used as injectable to the injectors
    //   provide: SongsService,
    //   // ! useClass add the service CLASSS
    //   useClass : SongsService,
    // }
    //@ we can also add service value
    // {
    //   provide: SongsService,
    //   useValue: mockSongService,
    // },

    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
