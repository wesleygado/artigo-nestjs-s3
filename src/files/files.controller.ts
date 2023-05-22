import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { FilesService } from './files.service';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import multerConfig from './multer-config';
import { Request } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('arquivo', multerConfig))
  uploadArquivo(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    console.log(file);
    return this.filesService.salvarDados(file, req);
  }

  @Post('varios')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'arquivos' }], multerConfig))
  async uploadVariosArquivos(
    @UploadedFiles()
    files: Express.Multer.File[],
    @Req() req: Request,
  ) {
    return await this.filesService.salvarVariosDados(files['arquivos'], req);
  }
}
