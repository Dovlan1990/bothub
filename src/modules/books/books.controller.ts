import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/role.enum';
import { Authorization } from 'src/common/decorators/authorization.decorator';
import { GetPagination } from 'src/common/dtos/get-pagination.dto';
import { RequestBH } from 'src/common/request';
import { UniversalResponseInterceptor } from 'src/common/interceptors/universal-response.interceptor';
import { UniversalResponse } from 'src/common/decorators/universal-response.decorator';
import { Book } from 'prisma/model/book.model';
import { BookCreateDTO } from './dto/book-create.dto';

@ApiTags('books')
@Controller({
  path: 'books',
  version: '1',
})
@UseInterceptors(UniversalResponseInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Roles(Role.ADMIN)
  @Authorization()
  @UniversalResponse(Book)
  create(@Body() book: BookCreateDTO, @Request() req: Required<RequestBH>): Promise<Book> {
    return this.booksService.create(book, req.user.id);
  }

  @Get()
  @UniversalResponse(Book, true)
  findAll(@Query() query: GetPagination): Promise<Book[]> {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  @UniversalResponse(Book)
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @Authorization()
  @UniversalResponse(Book, true)
  update(@Param('id') id: number, @Body() book: Book): Promise<Book> {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @Authorization()
  @UniversalResponse(String)
  remove(@Param('id') id: number): Promise<'Ok'> {
    return this.booksService.remove(id);
  }
}
