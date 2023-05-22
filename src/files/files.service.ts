import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Request } from 'express';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private fotoRepository: Repository<File>,
  ) {}

  async salvarDados(file: Express.Multer.File, req: Request) {
    const arquivo = new File();
    arquivo.fileName = file.filename;
    arquivo.contentLength = file.size;
    arquivo.contentType = file.mimetype;
    arquivo.url = `${req.protocol}://${req.get('host')}/files/${file.filename}`;

    return await this.fotoRepository.save(arquivo);
  }

  async salvarVariosDados(files: Express.Multer.File[], req: Request) {
    const arrayArquivos = files.map((file) => {
      const arquivo = new File();
      arquivo.fileName = file.filename;
      arquivo.contentLength = file.size;
      arquivo.contentType = file.mimetype;
      arquivo.url = `${req.protocol}://${req.get('host')}/files/${
        file.filename
      }`;
      return arquivo;
    });

    return await this.fotoRepository.save(arrayArquivos);
  }
}
