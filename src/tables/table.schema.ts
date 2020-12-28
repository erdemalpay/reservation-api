import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Table extends Document {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  seat: number;

  @Prop({ required: true, unique: true })
  order: number;
}

export const TableSchema = SchemaFactory.createForClass(Table);
TableSchema.index({ userId: 1 });
