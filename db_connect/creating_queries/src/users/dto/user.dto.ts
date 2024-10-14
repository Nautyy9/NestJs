import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { Playlist } from 'src/playlist/playlist.entity';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5, minUppercase: 1, minSymbols: 0 })
  readonly password: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  playLists: Playlist[];
}
