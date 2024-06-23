import { ApiPropertyOptional } from '@nestjs/swagger';
import { ToNumber } from '../transforms/to-number.transform';
import { IsNumber } from 'class-validator';

export class GetPagination {
  @IsNumber()
  @ToNumber()
  @ApiPropertyOptional()
  skip: number = 0;

  @IsNumber()
  @ToNumber()
  @ApiPropertyOptional()
  take: number = 10;
}
