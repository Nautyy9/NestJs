export type Connection = {
  url: string;
  db: string;
  name: string;
};

export type PayloadType = {
  email: string;
  userId: number;
  artistId?: number;
};

export type Enable2FAType = {
  secret: string;
};
