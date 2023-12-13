import { IsNumber, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  gerne: string;

  @IsString()
  createdBy: string;

  @IsString()
  description: string;
}
