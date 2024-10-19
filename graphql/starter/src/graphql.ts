
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class UpdateSongInput {
    title?: Nullable<string>;
}

export class CreateSongInput {
    title: string;
}

export class Song {
    id: string;
    title: string;
}

export abstract class IQuery {
    abstract songs(): Song[] | Promise<Song[]>;
}

export abstract class IMutation {
    abstract createSong(createSongInput: CreateSongInput): Song | Promise<Song>;

    abstract updateSong(id: string, updateSongInput: UpdateSongInput): UpdateResult | Promise<UpdateResult>;

    abstract deleteSong(id: string): DeleteResult | Promise<DeleteResult>;
}

export class UpdateResult {
    affected: number;
}

export class DeleteResult {
    affected: number;
}

export abstract class ISubscription {
    abstract songCreated(): Song | Promise<Song>;
}

type Nullable<T> = T | null;
