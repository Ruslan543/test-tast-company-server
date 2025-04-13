import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose, { Query, Schema } from "mongoose";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ContactModule } from "./contact/contact.module";
import { CompanyModule } from "./company/company.module";
import { AuthModule } from "./auth/auth.module";
import { getMongoDBConfig } from "./config/mongo.config";
import { CompanyImageModule } from "./company-image/company-image.module";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { path } from "app-root-path";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(path, "..", "uploads"),
      serveRoot: "/",
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoDBConfig,
    }),
    AuthModule,
    ContactModule,
    CompanyModule,
    CompanyImageModule,
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
