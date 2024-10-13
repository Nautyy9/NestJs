import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SongDTO {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artists: string[];
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsDateString()
  readonly releasedDate: Date;
  @IsNotEmpty()
  @IsMilitaryTime()
  readonly Duration: Date;
}
