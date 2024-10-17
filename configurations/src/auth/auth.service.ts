import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcryptjs';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { Enable2FAType, PayloadType } from 'types/types';
import * as speakeasy from 'speakeasy';
import { UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';
// import { ValidateTokenDTO } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private artistService: ArtistService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  getEnvVariables() {
    return {
      port: this.configService.get<number>('port'),
    };
  }

  async login(
    loginDTO: LoginDTO,
  ): Promise<
    { accessToken: string } | { validate2FA: string; message: string }
  > {
    const user = await this.userService.findOne(loginDTO);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );

    if (passwordMatched) {
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user.id };
      const artist = await this.artistService.findOne(user.id);
      if (artist) {
        payload.artistId = artist.id;
      }
      if (user.enable2FA && user.secret) {
        return {
          validate2FA: 'http://localhost:3000/auth/validate-2fa',
          message:
            'Please sends the one time password/token from your Google Authenticator App',
        };
      }
      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password does not match'); // 5.
    }
  }

  async enable2FA(userId: number): Promise<Enable2FAType> {
    const user = await this.userService.findOneById(userId);
    if (user.enable2FA) {
      return { secret: user.secret };
    }
    const secret = speakeasy.generateSecret();
    console.log(secret);

    user.secret = secret.base32;
    await this.userService.updateSecretKey(user.id, user.secret);
    return { secret: user.secret };
  }
  async validate2FA(
    userId: number,
    token: string,
  ): Promise<{ verified: boolean }> {
    try {
      // console.log(userId);
      // find the user on the based on id
      const user = await this.userService.findOneById(userId);
      console.log(user);
      // extract his 2FA secret

      // verify the secret with token by calling the speakeasy verify method
      const verified = speakeasy.totp.verify({
        secret: user.secret,
        token: token,
        encoding: 'base32',
      });
      // console.log(verified);
      // if validated then sends the json web token in the response
      if (verified) {
        return { verified: true };
      } else {
        return { verified: false };
      }
    } catch (err) {
      // console.log(err);
      throw new UnauthorizedException('Error verifying token');
    }
  }
  async disable2FA(userId: number): Promise<UpdateResult> {
    return this.userService.disable2FA(userId);
  }

  async validateUserByApiKey(apiKey: string): Promise<User> {
    return this.userService.findByApiKey(apiKey);
  }
}
