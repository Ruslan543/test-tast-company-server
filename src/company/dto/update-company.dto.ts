import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { ContractDto } from "./contract.dto";

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  shortName?: string;

  @IsOptional()
  @IsString()
  businessEntity?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContractDto)
  contract?: ContractDto;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  type?: string[];
}
