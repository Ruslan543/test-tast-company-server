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
import { ContactsService } from "./contact.service";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { IdValidationPipe } from "src/pipes/id.validation.pipe";
import { CreateContactDto } from "./dto/create-contact.dto";

@Controller("contacts")
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getOne(@Param("id", IdValidationPipe) id: string) {
    return this.contactsService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async create(dto: CreateContactDto) {
    return this.contactsService.create(dto);
  }

  @Patch(":id")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async update(
    @Param("id", IdValidationPipe) id: string,
    @Body() dto: UpdateContactDto,
  ) {
    return this.contactsService.update(id, dto);
  }
}
