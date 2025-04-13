import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { CompanyImageService } from "./company-image.service";
import { IdValidationPipe } from "src/pipes/id.validation.pipe";
import { FileInterceptor } from "@nestjs/platform-express";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/types/role.type";

@Controller("companies/:id/image")
@Auth(ROLES.ADMIN)
export class CompanyImageController {
  constructor(private readonly companyImageService: CompanyImageService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("file"))
  async create(
    @Param("id", IdValidationPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.companyImageService.create(id, file);
  }

  @Delete(":imageName")
  @HttpCode(HttpStatus.OK)
  async delete(
    @Param("id", IdValidationPipe) id: string,
    @Param("imageName") imageName: string,
  ) {
    return this.companyImageService.delete(id, imageName);
  }
}
