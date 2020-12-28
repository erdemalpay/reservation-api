import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  tableId: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  hour: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  contact: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
ReservationSchema.index({ userId: 1, tableId: 1 });
