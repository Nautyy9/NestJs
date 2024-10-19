/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SignupInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class LoginInput {
  email: string;
  password: string;
}

export class UpdateSongInput {
  title?: Nullable<string>;
}

export class CreateSongInput {
  title: string;
}

export class User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export abstract class IQuery {
  abstract login(
    loginInput: LoginInput,
  ): LoginResponse | Promise<LoginResponse>;

  abstract profile(): Profile | Promise<Profile>;

  abstract songs(): Song[] | Promise<Song[]>;
}

export abstract class IMutation {
  abstract signup(
    signupInput: SignupInput,
  ): SignupResponse | Promise<SignupResponse>;

  abstract createSong(createSongInput: CreateSongInput): Song | Promise<Song>;

  abstract updateSong(
    id: string,
    updateSongInput: UpdateSongInput,
  ): UpdateResult | Promise<UpdateResult>;

  abstract deleteSong(id: string): DeleteResult | Promise<DeleteResult>;
}

export class SignupResponse {
  email: string;
}

export class LoginResponse {
  accessToken: string;
}

export class Profile {
  email: string;
  userId: string;
}

export abstract class ISubscription {
  abstract songCreated(): Song | Promise<Song>;
}

export class Song {
  id: string;
  title: string;
}

export class UpdateResult {
  affected: number;
}

export class DeleteResult {
  affected: number;
}

type Nullable<T> = T | null;
