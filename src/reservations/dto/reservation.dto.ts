import { IsNotEmpty, IsIn } from 'class-validator';

export class ReservationDto {
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  hour: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  contact: string;
}
