import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  fullName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(120)
  @Type(() => Number)
  age?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
