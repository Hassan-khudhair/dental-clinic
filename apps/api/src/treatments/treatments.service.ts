import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Injectable()
export class TreatmentsService {
  constructor(private prisma: PrismaService) {}

  findAll(patientId?: string) {
    return this.prisma.treatment.findMany({
      where: patientId ? { patientId } : undefined,
      include: { patient: true },
      orderBy: { treatmentDate: 'desc' },
    });
  }

  create(dto: CreateTreatmentDto) {
    return this.prisma.treatment.create({
      data: {
        ...dto,
        treatmentDate: new Date(dto.treatmentDate),
      },
      include: { patient: true },
    });
  }

  async update(id: string, dto: UpdateTreatmentDto) {
    const exists = await this.prisma.treatment.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Treatment not found');
    return this.prisma.treatment.update({
      where: { id },
      data: {
        ...dto,
        treatmentDate: dto.treatmentDate ? new Date(dto.treatmentDate) : undefined,
      },
      include: { patient: true },
    });
  }

  async remove(id: string) {
    const exists = await this.prisma.treatment.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Treatment not found');
    await this.prisma.treatment.delete({ where: { id } });
    return { message: 'Deleted' };
  }
}
