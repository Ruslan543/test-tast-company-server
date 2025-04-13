import { IsNotEmpty, IsString } from "class-validator";

export class PhotoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  filepath: string;

  @IsNotEmpty()
  @IsString()
  thumbpath: string;
}
