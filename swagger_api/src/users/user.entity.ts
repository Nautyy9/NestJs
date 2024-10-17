import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Playlist } from 'src/playlist/playlist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ApiProperty({
    example: 'Test123#@',
    description:
      'Must include atleast one capital letter . Must have atleast 6 characters .Must Include atleast one special character',
  })
  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true, type: 'text' })
  secret: string;

  @Column({ default: false, type: 'boolean' })
  enable2FA: boolean;

  @Column({ nullable: true, type: 'text' })
  apiKey: string;

  @Column({ nullable: true, type: 'text' })
  phone: string;

  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists?: Playlist[];
}
