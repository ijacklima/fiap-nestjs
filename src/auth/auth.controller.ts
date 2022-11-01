import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

//vai trabalhar na rota auth
@Controller('auth')
export class AuthController {
  //injecao de dependencia
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async validaLogin(@Body() req) {
    const { login, password } = req;

    if (!login) {
      //return { error: true, msg: 'Login não informado!' };

      throw new HttpException('Login não encontrado', HttpStatus.FORBIDDEN);
    }

    console.log('login', login);
    console.log('senha', password);
    return this.authService.validaLogin(login, password);
  }
}
