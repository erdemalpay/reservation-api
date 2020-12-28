import { Module } from '@nestjs/common';
import { TableController as TablesController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './reservation.schema';
import { ReservationRepository } from './reservation.repository';
import { AuthModule } from '../auth/auth.module';
import { Connection } from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

const mongooseModule = MongooseModule.forFeatureAsync([
  {
    name: Reservation.name,
    useFactory: async (connection: Connection) => {
      const schema = ReservationSchema;
      const AutoIncrement = AutoIncrementFactory(connection);
      schema.plugin(AutoIncrement, {
        id: 'reservationId',
        inc_field: 'id',
      });
      return schema;
    },
    inject: [getConnectionToken()],
  },
]);

@Module({
  imports: [mongooseModule, AuthModule],
  controllers: [TablesController],
  providers: [ReservationService, ReservationRepository],
})
export class ReservationsModule {}
