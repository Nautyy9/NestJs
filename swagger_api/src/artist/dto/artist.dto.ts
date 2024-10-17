import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { Song } from 'src/songs/song.entity';

export class CreateArtistDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly user: number;

  // @IsNotEmpty()
  // @IsString()
  // readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: Song[];
}
