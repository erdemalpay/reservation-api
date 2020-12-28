import { Module } from '@nestjs/common';
import { mongoUrl } from './config/mongoose.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { TablesModule } from './tables/tables.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    MongooseModule.forRoot(mongoUrl, {
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    AuthModule,
    TablesModule,
    TablesModule,
    ReservationsModule,
  ],
})
export class AppModule {}
