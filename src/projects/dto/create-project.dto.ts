import { IsString, MinLength, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}