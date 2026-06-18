import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateTreatmentDto {
  @IsString()
  patientId: string;

  @IsString()
  procedureName: string;

  @IsDateString()
  treatmentDate: string;

  @IsOptional()
  @IsString()
  doctorNotes?: string;
}
