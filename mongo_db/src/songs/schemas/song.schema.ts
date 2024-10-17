import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Album } from 'src/album/album_schema/album.schema';

export type SongDocument = HydratedDocument<Song>;
@Schema()
export class Song {
  // @Prop => property
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  releasedDate: Date;

  @Prop({
    required: true,
  })
  duration: string;

  lyrics: string;

  @Prop({
    type: Types.ObjectId,
    ref: Album.name,
  })
  album: Album;
}

// schemaFactory generates schema definations from our class that mongoDB can understand
export const SongSchema = SchemaFactory.createForClass(Song);
