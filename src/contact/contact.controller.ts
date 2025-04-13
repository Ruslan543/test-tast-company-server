import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Auth } from "src/auth/decorators/auth.decorator";
import { IdValidationPipe } from "src/pipes/id.validation.pipe";
import { ContactService } from "./contact.service";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { CreateContactDto } from "./dto/create-contact.dto";
import { ROLES } from "src/auth/types/role.type";

@Controller("contacts")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  @Auth()
  async getOne(@Param("id", IdValidationPipe) id: string) {
    return this.contactService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @Auth()
  async create(dto: CreateContactDto) {
    return this.contactService.create(dto);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe())
  @Auth(ROLES.ADMIN)
  async update(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactService.update(id, dto);
  }
}
