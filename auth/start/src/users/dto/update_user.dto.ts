import {
  IsArray,
  IsEmail,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { Playlist } from 'src/playlist/playlist.entity';

export class UpdateUserDTO {
  @IsOptional()
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5, minUppercase: 1, minSymbols: 0 })
  password: string;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  playLists?: Playlist[];
}
