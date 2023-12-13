import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  gerne: string;

  @IsNotEmpty()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
