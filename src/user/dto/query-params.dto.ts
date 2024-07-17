import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class QueryParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  take?: number;

  @IsOptional()
  @Type(() => String)
  query?: string;
}
