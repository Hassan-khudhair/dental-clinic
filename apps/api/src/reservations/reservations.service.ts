import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Status } from '@prisma/client';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateReservationDto) {
    return this.prisma.reservation.create({
      data: {
        ...dto,
        preferredDate: dto.preferredDate ? new Date(dto.preferredDate) : null,
      },
    });
  }

  async findAll(status?: string) {
    return this.prisma.reservation.findMany({
      where: status ? { status: status as Status } : undefined,
      include: { patient: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: string, dto: UpdateReservationDto) {
    const exists = await this.prisma.reservation.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Reservation not found');

    return this.prisma.reservation.update({
      where: { id },
      data: {
        ...dto,
        preferredDate: dto.preferredDate ? new Date(dto.preferredDate) : undefined,
      },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.reservation.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Reservation not found');
    await this.prisma.reservation.delete({ where: { id } });
    return { message: 'Deleted' };
  }
}
