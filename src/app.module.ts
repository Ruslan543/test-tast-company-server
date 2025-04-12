import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose, { Query, Schema } from "mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ContactsModule } from "./contact/contact.module";
import { CompanyModule } from "./company/company.module";
import { AuthModule } from "./auth/auth.module";
import { getMongoDBConfig } from "./config/mongo.config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDBConfig,
    }),
    AuthModule,
    ContactsModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    mongoose.plugin((schema: Schema) => {
      schema.pre(/^find/, function (this: Query<unknown, unknown>, next) {
        this.select("-__v");
        next();
      });
    });
  }
}
