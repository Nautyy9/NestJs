import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { Playlist } from 'src/playlist/playlist.entity';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 5, minUppercase: 1, minSymbols: 0 })
  password: string;

  @IsString()
  @IsOptional()
  twoFASecret: string | null;

  @IsBoolean()
  @IsOptional()
  enable2FA: boolean;

  @IsArray()
  @IsOptional()
  @IsNumber({}, { each: true })
  playLists?: Playlist[];
}
