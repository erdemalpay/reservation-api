import {
  Controller,
  Get,
  UseGuards,
  Post,
  Put,
  ValidationPipe,
  Body,
  Delete,
  Param,
} from '@nestjs/common';
import { Reservation } from './reservation.schema';
import { ReservationService } from './reservation.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.schema';
import { GetUser } from '../auth/get-user.decorator';
import { ReservationDto } from './dto/reservation.dto';

@Controller('reservations')
export class TableController {
  constructor(private reservationService: ReservationService) {}

  @UseGuards(AuthGuard())
  @Get('/:table')
  getReservations(
    @GetUser()
    user: User,
    @Param('table')
    tableId: number,
  ): Promise<Reservation[]> {
    return this.reservationService.getReservationsByUserAndTable(
      user.id,
      tableId,
    );
  }

  @UseGuards(AuthGuard())
  @Post('/:table')
  createReservation(
    @GetUser()
    user: User,
    @Param('table')
    tableId: number,
    @Body(ValidationPipe)
    table: ReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.createReservation(user.id, tableId, table);
  }

  @UseGuards(AuthGuard())
  @Put('/:id')
  updateReservation(
    @Param('id')
    id: number,
    @Body(ValidationPipe)
    table: ReservationDto,
  ): Promise<Reservation> {
    return this.reservationService.updateReservation(id, table);
  }

  @UseGuards(AuthGuard())
  @Delete('/:id')
  deleteReservation(@Param('id') id: number): Promise<number> {
    return this.reservationService.deleteReservation(id);
  }
}
