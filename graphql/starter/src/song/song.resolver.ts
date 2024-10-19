import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Song, CreateSongInput } from 'src/graphql';
import { SongService } from './song.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateSongDTO } from './dto/update-song.dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
//@ resolver in a NestJS application, which is a key component for defining how data is fetched.
// @Resolver(), indicating its role in handling GraphQL queries, specifically for fetching songs using a service.

@Resolver()
export class SongResolver {
  constructor(private readonly songService: SongService) {}
  @Query('songs')
  async getSongs(): Promise<Song[]> {
    return this.songService.getSongs();
  }
  @Query('songs')
  async getSong(
    @Args('id')
    id: string,
  ): Promise<Song> {
    return this.songService.getSongById(id);
  }
  @Mutation('createSong')
  async createSong(
    @Args('createSongInput')
    args: CreateSongInput,
  ): Promise<Song> {
    const newSong = await this.songService.createSong(args);
    await pubSub.publish('songCreated', { songCreated: newSong });
    return newSong;
  }
  @Mutation('updateSong')
  async updateSong(
    @Args('updateSongInput')
    args: UpdateSongDTO,
    @Args('id')
    id: string,
  ): Promise<UpdateResult> {
    return await this.songService.updateSong(id, args);
  }

  @Mutation('deleteSong')
  async deleteSong(
    @Args('id')
    id: string,
  ): Promise<DeleteResult> {
    return await this.songService.deleteSong(id);
  }
  @Subscription('songCreated')
  songCreated() {
    return pubSub.asyncIterator('songCreated');
  }
}
