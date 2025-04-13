import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { JwtService } from "@nestjs/jwt";
import { compare, genSalt, hash } from "bcryptjs";

import { User, UserDocument, UserModel } from "src/user/user.model";
import { RefreshTokenDto } from "./dto/refreshToken.dto";
import { AuthDto } from "./dto/auth.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: UserModel,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const oldUser = await this.UserModel.findOne({ email: dto.email });

    if (oldUser) {
      throw new BadRequestException(
        "User with email is already in the system!",
      );
    }

    const password = await this.hashingPassword(dto.password);
    const newUser = await this.UserModel.create({
      email: dto.email,
      password,
      name: dto.name,
    });

    const tokens = await this.issueTokenPair(newUser._id.toString());

    return { user: newUser, ...tokens };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueTokenPair(user._id.toString());

    return { user, ...tokens };
  }

  async validateUser(dto: AuthDto) {
    const { email, password } = dto;
    const user = await this.UserModel.findOne({ email });

    const isValidUser = user && (await compare(password, user.password));

    if (!isValidUser) {
      throw new UnauthorizedException("Incorrect login or password!");
    }

    return user;
  }

  async issueTokenPair(userId: string) {
    const data = { _id: userId };

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: "15d",
    });

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: "1d",
    });

    return { accessToken, refreshToken };
  }

  returnUserFields(user: UserDocument) {
    return {
      _id: user._id,
      email: user.email,
      name: user.name,
    };
  }

  async getNewTokens({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException("Please sign in!");

    const decoded = await this.jwtService.verifyAsync(refreshToken);
    if (!decoded) throw new UnauthorizedException("Invalid token or expired!");

    const user = await this.UserModel.findById(decoded._id);

    if (!user) {
      throw new UnauthorizedException(
        "The user belonging to this token does not exist!",
      );
    }

    if (this.changedPasswordAfter(user, decoded.iat)) {
      throw new UnauthorizedException(
        "User has changed password! Please login again",
      );
    }

    const tokens = await this.issueTokenPair(user._id.toString());
    return { user, ...tokens };
  }

  private changedPasswordAfter(user: UserDocument, jwtTimestamp: number) {
    if (!user.passwordChangedAt) return false;

    const changedTimestamp = parseInt(
      String(user.passwordChangedAt.getTime() / 1000),
      10,
    );

    return jwtTimestamp < changedTimestamp;
  }

  private async hashingPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }
}
