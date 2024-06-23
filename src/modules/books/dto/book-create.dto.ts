import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class BookCreateDTO {
  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @Type(()=>Date)
  @IsDate()
  @ApiProperty()
  publicationDate: Date;

  @ApiProperty({ type: 'string', isArray: true })
  genres: string[];
}
