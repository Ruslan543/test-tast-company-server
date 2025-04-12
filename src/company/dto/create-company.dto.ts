import { Type } from "class-transformer";
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { Types } from "mongoose";
import { ContractDto } from "./contract.dto";
import { COMPANY_STATUS, CompanyStatus } from "../types/company.interface";

export class CreateCompanyDto {
  contactId: Types.ObjectId;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  shortName: string;

  @IsNotEmpty()
  @IsString()
  businessEntity: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContractDto)
  contract: ContractDto;

  @IsNotEmpty()
  @IsString()
  @IsIn([COMPANY_STATUS.ACTIVE, COMPANY_STATUS.INACTIVE])
  status: CompanyStatus;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  type: string[];
}

// Нужно дописать поля внизу

// export class Company {
//   contract: Contract;
//   photos: Photo[];
// }
