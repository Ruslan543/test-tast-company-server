import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { ROLES, TypeRoles } from "src/auth/types/role.type";

export type UserDocument = HydratedDocument<User>;
export interface UserModel extends Model<UserDocument> {}

@Schema({ timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  name: string;

  @Prop()
  passwordChangedAt: Date;

  @Prop({ default: [ROLES.USER] })
  roles: TypeRoles[];
}

export const UserSchema = SchemaFactory.createForClass(User);
