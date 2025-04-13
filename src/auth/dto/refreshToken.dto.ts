import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RefreshTokenDto {
  @IsString({
    message: "You did not pass refresh token or it is not a string!",
  })
  @IsNotEmpty()
  refreshToken: string;
}
