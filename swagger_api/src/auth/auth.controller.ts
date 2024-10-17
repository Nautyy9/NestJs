import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/user.dto';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { JwtAuthGaurd } from './jwt-guard';
import { ValidateTokenDTO } from './dto/token.dto';
import { Enable2FAType } from 'types/types';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @ApiOperation({ summary: 'Getting Test' })
  @ApiResponse({
    status: 200,
    description: 'It will return environment variables',
  })
  @Get('test')
  testEnv() {
    return this.authService.getEnvVariables();
  }
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'It will return the user in the response',
  })
  @Post('signup')
  signup(
    @Body()
    authDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(authDTO);
  }
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 201,
    description:
      'It will give you the access_token in the response if 2FA is not initialized , else if 2FA is initialized then go to the enable 2fa which will provide a secret and validate the user with validate 2fa after getting the code with Authenicator.',
  })
  @Post('login')
  login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return this.authService.login(loginDTO);
  }
  @Get('enable-2fa')
  @UseGuards(JwtAuthGaurd)
  enable2FA(
    @Request()
    req,
  ): Promise<Enable2FAType> {
    return this.authService.enable2FA(req.user.userId);
  }
  @Post('validate-2fa')
  @UseGuards(JwtAuthGaurd)
  validate2FA(
    @Request() req,
    @Body() validateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FA(
      req.user.userId,
      validateTokenDTO.token,
    );
  }

  @Get('disable-2fa')
  @UseGuards(JwtAuthGaurd)
  disable2FA(
    @Request()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.userId);
  }
  @ApiBearerAuth('bearer-auth')
  @Get('profile')
  @UseGuards(AuthGuard('bearer'))
  getProfile(
    @Request()
    req,
  ) {
    delete req.user.password;
    return {
      msg: 'authenticated with api key',
      user: req.user,
    };
  }
}
