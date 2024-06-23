import { ApiProperty } from '@nestjs/swagger';
import { Book } from './book.model';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: number;

  @ApiProperty({ type: () => Book, isArray: true })
  books?: Book[];
}
