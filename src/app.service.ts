import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    enum Mes {
      Janeiro,
      Fevereiro,
      Marco,
      Abril,
      Maio,
      Junho,
    }

    for (const mes in Mes) {
      console.log(Mes[mes].length);
    }

    return 'Hello World!';
  }
}
