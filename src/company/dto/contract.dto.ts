import { Type } from "class-transformer";
import { IsDate, IsString } from "class-validator";

export class ContractDto {
  @IsString()
  no: string;

  @Type(() => Date)
  @IsDate()
  issue_date: Date;
}
