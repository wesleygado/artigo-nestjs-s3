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
    arquivo.url = `http://${req.get('host')}/files/${file.filename}`;

    return await this.fotoRepository.save(arquivo);
  }

  async salvarVariosDados(files, req: Request) {
    const filesInformation = [];

    const arquivoUm = new File();
    arquivoUm.fileName = files.arquivo_um[0].filename;
    arquivoUm.contentLength = files.arquivo_um[0].size;
    arquivoUm.contentType = files.arquivo_um[0].mimetype;
    arquivoUm.url = `http://${req.get('host')}/files/${
      files.arquivo_um[0].filename
    }`;

    filesInformation.push(await this.fotoRepository.save(arquivoUm));

    const arquivoDois = new File();
    arquivoDois.fileName = files.arquivo_dois[0].filename;
    arquivoDois.contentLength = files.arquivo_dois[0].size;
    arquivoDois.contentType = files.arquivo_dois[0].mimetype;
    arquivoDois.url = `http://${req.get('host')}/files/${
      files.arquivo_dois[0].filename
    }`;

    filesInformation.push(await this.fotoRepository.save(arquivoDois));

    return filesInformation;
  }
}
