import { IsString, IsArray } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  restaurantName: string;
}
