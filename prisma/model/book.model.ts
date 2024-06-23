import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model.';

export class Book {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  publicationDate: Date;

  @ApiProperty({ type: 'string', isArray: true })
  genres: string[];

  @ApiProperty()
  userId: number;

  @ApiProperty({ type: () => User })
  user?: User;
}
