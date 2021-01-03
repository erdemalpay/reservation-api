import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { Reservation } from './reservation.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ReservationDto } from './dto/reservation.dto';

async function purify(reservation: Reservation): Promise<Reservation> {
  const tempTable = reservation.toObject();
  delete tempTable._id;
  delete tempTable.__v;
  return tempTable;
}

@Injectable()
export class ReservationRepository {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<Reservation>,
  ) {}

  async getAllByUserAndTableId(
    userId: number,
    tableId: number,
    date: string,
  ): Promise<Reservation[]> {
    if (date) {
      return this.reservationModel.find({ userId, tableId, date });
    }
    return this.reservationModel.find({ userId, tableId });
  }

  async getAllByUserId(userId: number): Promise<Reservation[]> {
    return this.reservationModel.find({ userId });
  }

  async create(
    userId: number,
    tableId: number,
    reservationDto: ReservationDto,
  ): Promise<Reservation> {
    try {
      const reservation = await this.reservationModel.create({
        userId,
        tableId,
        ...reservationDto,
      });
      return purify(reservation);
    } catch (error) {
      if (error.code === 11000) {
        // duplicate item
        throw new ConflictException(
          `This table is already reserved for this time.`,
        );
      }
      throw error;
    }
  }

  async update(
    id: number,
    reservationDto: ReservationDto,
  ): Promise<Reservation> {
    try {
      const reservation = await this.reservationModel.findOneAndUpdate(
        { id },
        reservationDto,
        {
          new: true,
        },
      );
      if (!reservation) {
        throw new NotFoundException(`Reservation with id ${id} does not exist`);
      }
      return purify(reservation);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `This table is already reserved for this time.`,
        );
      }
      throw error;
    }
  }

  async delete(id: number): Promise<number> {
    await this.reservationModel.findOneAndDelete({ id });
    return id;
  }
}
