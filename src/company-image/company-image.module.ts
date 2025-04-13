import { Module } from "@nestjs/common";
import { CompanyImageController } from "./company-image.controller";
import { CompanyImageService } from "./company-image.service";
import { CompanyModule } from "src/company/company.module";

@Module({
  imports: [CompanyModule],
  controllers: [CompanyImageController],
  providers: [CompanyImageService],
})
export class CompanyImageModule {}
