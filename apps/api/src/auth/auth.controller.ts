import { All, Controller, Req, Res } from '@nestjs/common';
import { toNodeHandler } from 'better-auth/node';
import type { Request, Response } from 'express';
import { auth } from './auth.instance';
import { Public } from './decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  private readonly handler = toNodeHandler(auth);

  @All('*')
  handle(@Req() req: Request, @Res() res: Response) {
    return this.handler(req, res);
  }
}
