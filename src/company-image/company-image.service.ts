import { BadRequestException, Injectable } from "@nestjs/common";
import { path } from "app-root-path";
import { randomUUID } from "crypto";
import fs, { ensureDir, writeFile } from "fs-extra";
import { extname } from "path";
import sharp from "sharp";

import { Photo } from "src/company/company.model";
import { CompanyService } from "src/company/company.service";
import { FileNames } from "src/company/types/company.interface";

@Injectable()
export class CompanyImageService {
  folderImage: string = `${path}/uploads/images`;

  constructor(private readonly companyService: CompanyService) {}

  async create(companyId: string, file: Express.Multer.File) {
    const company = await this.companyService.byId(companyId);

    await ensureDir(this.folderImage);

    const { originalname, buffer } = file;
    const { fileName, filePath, thumbPath } = this.getFileNames(originalname);

    await writeFile(filePath, buffer);
    await sharp(filePath).resize(200).toFile(thumbPath);

    const photo: Photo = {
      name: fileName,
      filepath: `images/${fileName}`,
      thumbpath: `images/${thumbPath}`,
    };

    company.photos.push(photo);
    await company.save();

    return company;
  }

  async delete(companyId: string, imageName: string) {
    const company = await this.companyService.byId(companyId);
    const filePath = `${this.folderImage}/${imageName}`;
    const thumbPath = this.getFilePathThumb(imageName);

    const isFileExists = await fs.pathExists(filePath);
    const isThumbExists = await fs.pathExists(thumbPath);

    if (!isFileExists && !isThumbExists) {
      throw new BadRequestException("Images does not exist");
    }

    if (isFileExists) await fs.remove(filePath);
    if (isThumbExists) await fs.remove(thumbPath);

    company.photos = company.photos.filter((photo) => photo.name !== imageName);
    await company.save();

    return company;
  }

  private getFileNames(originalName: string): FileNames {
    const fileName = randomUUID() + extname(originalName);
    const filePath = `${this.folderImage}/${fileName}`;
    const filePathThumb = this.getFilePathThumb(fileName);

    return {
      fileName,
      filePath,
      thumbPath: filePathThumb,
    };
  }

  private getFilePathThumb(fileName: string): string {
    const fileSplit = fileName.split(".");
    const extension = fileSplit.at(-1);
    const fileNameThumb = `${fileSplit.slice(0, -1).join(".")}_thumb.${extension}`;
    const filePathThumb = `${this.folderImage}/${fileNameThumb}`;

    return filePathThumb;
  }
}
