import {
  IsArray,
  IsDateString,
  IsEmpty,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Artist } from 'src/artist/artist.entity';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists: Artist[];

  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics?: string;
}
