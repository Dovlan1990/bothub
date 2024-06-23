import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
      global: true,
    }),
  ],
})
export class AppModule {}
