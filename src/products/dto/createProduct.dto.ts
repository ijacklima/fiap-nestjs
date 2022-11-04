import { IsString, IsNumberString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  name: string;

  @IsNumberString()
  price: number;

  @IsString()
  description: string;

  @IsNumberString()
  categoryId: number;
}
