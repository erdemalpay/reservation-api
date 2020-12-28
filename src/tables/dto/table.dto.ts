import { IsNotEmpty, IsIn } from 'class-validator';

export class TableDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  seat: number;

  @IsNotEmpty()
  order: number;
}
