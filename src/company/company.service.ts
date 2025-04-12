import { Injectable, NotFoundException } from "@nestjs/common";
import { Company, CompanyModel } from "./company.model";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name) private readonly CompanyModel: CompanyModel,
  ) {}

  async getOne(id: string) {
    const company = await this.CompanyModel.findById(id).exec();
    if (!company) {
      throw new NotFoundException("Company not found");
    }

    return company;
  }

  async create(dto: CreateCompanyDto) {
    const company = await this.CompanyModel.create(dto);
    return company;
  }

  async update(id: string, dto: UpdateCompanyDto) {
    const company = await this.CompanyModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    }).exec();

    if (!company) {
      throw new NotFoundException("Company not found");
    }

    return company;
  }

  async delete(id: string) {
    const company = await this.CompanyModel.findByIdAndDelete(id).exec();
    if (!company) {
      throw new NotFoundException("Company not found");
    }

    return company;
  }
}
