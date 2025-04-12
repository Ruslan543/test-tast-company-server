import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model, Types } from "mongoose";
import { COMPANY_STATUS } from "./types/company.interface";

export type CompanyDocument = HydratedDocument<Company>;
export interface CompanyModel extends Model<CompanyDocument> {}

function setObjectId(value: string): Types.ObjectId {
  return new Types.ObjectId(value);
}

@Schema()
export class Contract {
  no: string;
  issue_date: Date;
}
export const ContractSchema = SchemaFactory.createForClass(Contract);

@Schema()
export class Photo {
  name: string;
  filepath: string;
  thumbpath: string;
}
export const PhotoSchema = SchemaFactory.createForClass(Photo);

@Schema({ timestamps: true })
export class Company {
  @Prop({ set: setObjectId })
  contactId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  shortName: string;

  @Prop()
  businessEntity: string;

  @Prop({ type: ContractSchema })
  contract: Contract;

  @Prop({ type: [String] })
  type: string[];

  @Prop({ default: COMPANY_STATUS.ACTIVE })
  status: string;

  @Prop({ type: [PhotoSchema] })
  photos: Photo[];
}

export const CompanySchema = SchemaFactory.createForClass(Company);
