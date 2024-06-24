import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { BookCreateDTO } from './dto/book-create.dto';
import { BookUpdateDTO } from './dto/book-update.dto';
import { GetPagination } from 'src/common/dtos/get-pagination.dto';
import { Book } from 'prisma/model/book.model';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(data: BookCreateDTO, userId: number): Promise<Book> {
    return this.prisma.books.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  findAll(query: GetPagination): Promise<Book[]> {
    return this.prisma.books.findMany(query);
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.prisma.books.findUnique({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  //тут лучше бы транзакцию
  async update(id: number, data: BookUpdateDTO): Promise<Book> {
    const book = await this.prisma.books.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return this.prisma.books.update({
      where: { id },
      data,
    });
  }

  //и тут
  async remove(id: number): Promise<'Ok'> {
    const book = await this.prisma.books.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    await this.prisma.books.delete({ where: { id } });

    return 'Ok';
  }
}
