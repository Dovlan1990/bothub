import { OmitType, PartialType } from '@nestjs/swagger';
import { BookCreateDTO } from './book-create.dto';
import { IsOptionalClass } from 'src/common/decorators/is-optional-class.decorator';

@IsOptionalClass()
export class BookUpdateDTO extends PartialType(BookCreateDTO) {}
