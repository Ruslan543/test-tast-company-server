import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { IdValidationPipe } from "src/pipes/id.validation.pipe";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { Auth } from "src/auth/decorators/auth.decorator";
import { ROLES } from "src/auth/types/role.type";

@Controller("companies")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @Auth()
  async byId(@Param("id", IdValidationPipe) id: string) {
    return this.companyService.byId(id);
  }

  @Get(":id")
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @Auth()
  async create(@Body() dto: CreateCompanyDto) {
    return this.companyService.create(dto);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Auth(ROLES.ADMIN)
  async update(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: UpdateCompanyDto,
  ) {
    return this.companyService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @Auth(ROLES.ADMIN)
  async delete(@Param("id", IdValidationPipe) id: string) {
    return this.companyService.delete(id);
  }
}
