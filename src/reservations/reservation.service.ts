import { Injectable } from '@nestjs/common';
import { Reservation } from './reservation.schema';
import { ReservationRepository } from './reservation.repository';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationService {
  constructor(private reservationRepository: ReservationRepository) {}

  async getReservationsByUserAndTable(
    userId: number,
    tableId: number,
  ): Promise<Reservation[]> {
    return this.reservationRepository.getAllByUserAndTableId(userId, tableId);
  }

  async createReservation(
    userId: number,
    tableId: number,
    reservation: ReservationDto,
  ): Promise<Reservation> {
    return this.reservationRepository.create(userId, tableId, reservation);
  }

  async updateReservation(
    id: number,
    table: ReservationDto,
  ): Promise<Reservation> {
    return this.reservationRepository.update(id, table);
  }

  async deleteReservation(id: number): Promise<number> {
    return this.reservationRepository.delete(id);
  }
}
