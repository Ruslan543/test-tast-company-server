import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { Contact, ContactModel } from "./contact.model";
import { InjectModel } from "@nestjs/mongoose";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private readonly ContactModel: ContactModel,
  ) {}

  async getOne(id: string) {
    const contact = await this.ContactModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException("Contact not found");
    }

    return contact;
  }

  async create(dto: CreateContactDto) {
    const contact = await this.ContactModel.create(dto);
    return contact;
  }

  async update(id: string, dto: UpdateContactDto) {
    const contact = await this.ContactModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).exec();

    if (!contact) {
      throw new NotFoundException("Contact not found");
    }

    return contact;
  }

  async delete(id: string) {
    const contact = await this.ContactModel.findByIdAndDelete(id).exec();
    if (!contact) throw new NotFoundException("Contact not found");

    return contact;
  }
}
