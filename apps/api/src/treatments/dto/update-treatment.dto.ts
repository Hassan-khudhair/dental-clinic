import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateTreatmentDto {
  @IsOptional()
  @IsString()
  procedureName?: string;

  @IsOptional()
  @IsDateString()
  treatmentDate?: string;

  @IsOptional()
  @IsString()
  doctorNotes?: string;
}
