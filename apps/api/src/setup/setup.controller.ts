import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { PrismaService } from '../prisma/prisma.service';
import { auth } from '../auth/auth.instance';
import { Public } from '../auth/decorators/public.decorator';

class CreateAdminDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

@Public()
@Controller('setup')
export class SetupController {
  constructor(private prisma: PrismaService) {}

  @Post('admin')
  async createAdmin(@Body() dto: CreateAdminDto) {
    const existing = await this.prisma.user.findFirst();
    if (existing) {
      throw new ForbiddenException(
        'Setup already completed. Admin account exists.',
      );
    }

    try {
      const result = await auth.api.signUpEmail({
        body: { name: dto.name, email: dto.email, password: dto.password },
      });

      return {
        message: 'Admin account created successfully',
        email: result.user.email,
      };
    } catch (err: any) {
      throw new BadRequestException(err?.message ?? 'Failed to create admin');
    }
  }
}
