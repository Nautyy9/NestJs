import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';

export class CreatePlayListDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: number[];

  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
