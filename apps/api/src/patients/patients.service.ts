import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.patient.findMany({
      include: {
        reservations: { orderBy: { createdAt: 'desc' } },
        treatments: { orderBy: { treatmentDate: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        reservations: { orderBy: { createdAt: 'desc' } },
        treatments: { orderBy: { treatmentDate: 'desc' } },
      },
    });
    if (!patient) throw new NotFoundException('Patient not found');
    return patient;
  }

  create(dto: CreatePatientDto) {
    return this.prisma.patient.create({ data: dto });
  }

  async update(id: string, dto: UpdatePatientDto) {
    const exists = await this.prisma.patient.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Patient not found');
    return this.prisma.patient.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const exists = await this.prisma.patient.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Patient not found');
    await this.prisma.patient.delete({ where: { id } });
    return { message: 'Deleted' };
  }
}
