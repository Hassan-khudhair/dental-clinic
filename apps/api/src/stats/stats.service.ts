import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [
      totalReservations,
      todayReservations,
      pendingReservations,
      totalPatients,
      completedTreatments,
    ] = await Promise.all([
      this.prisma.reservation.count(),
      this.prisma.reservation.count({
        where: { createdAt: { gte: today, lt: tomorrow } },
      }),
      this.prisma.reservation.count({ where: { status: 'PENDING' } }),
      this.prisma.patient.count(),
      this.prisma.reservation.count({ where: { status: 'COMPLETED' } }),
    ]);

    return {
      totalReservations,
      todayReservations,
      pendingReservations,
      totalPatients,
      completedTreatments,
    };
  }
}
