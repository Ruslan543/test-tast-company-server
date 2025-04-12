import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { IdValidationPipe } from "src/pipes/id.validation.pipe";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";

@Controller("companies")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getOne(@Param("id", IdValidationPipe) id: string) {
    return this.companyService.getOne(id);
  }

  @Get(":id")
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateCompanyDto) {
    return this.companyService.create(dto);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async update(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id", IdValidationPipe) id: string) {
    return this.companyService.delete(id);
  }

  // Нужно дописать эти методы
  @Post(":id/image")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async createImage(@Param("id", IdValidationPipe) id: string) {
    return this.companyService.delete(id);
  }

  @Delete(":id/:imageName")
  @HttpCode(HttpStatus.OK)
  async deleteImage(@Param("id", IdValidationPipe) id: string) {
    return this.companyService.delete(id);
  }
}
