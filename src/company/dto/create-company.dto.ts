import { Transform, Type } from "class-transformer";
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
import { IsObjectId } from "src/decorators/isObjectId.decorator";
import { transformToObjectId } from "src/utils/transforms/object-id.transform";
import { PhotoDto } from "./photo.dto";

export class CreateCompanyDto {
  @IsNotEmpty()
  @IsObjectId()
  @Transform(transformToObjectId())
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

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotoDto)
  photos: PhotoDto[];
}
