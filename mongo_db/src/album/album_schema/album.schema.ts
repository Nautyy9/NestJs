import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Song } from 'src/songs/schemas/song.schema';
export type AlbumDocument = HydratedDocument<Album>;
@Schema()
export class Album {
  @Prop({
    required: true,
  })
  title: string;

  // store the references to the id of the song collection
  @Prop({ type: [Types.ObjectId], ref: 'songs' }) //1
  songs: Song[];
}
export const AlbumSchema = SchemaFactory.createForClass(Album);
