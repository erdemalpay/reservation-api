import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.createUser(createUserDto);
    const payload: JwtPayload = { email: user.email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const email = await this.userRepository.validateUserPassword(
      authCredentialsDto,
    );
    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userRepository.updateUser(user, updateUserDto);
  }
}
