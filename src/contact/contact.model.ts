import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model, Types } from "mongoose";

export type ContactDocument = HydratedDocument<Contact>;
export interface ContactModel extends Model<ContactDocument> {}

@Schema({ timestamps: true })
export class Contact {
  @Prop()
  lastname: string;

  @Prop()
  firstname: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
