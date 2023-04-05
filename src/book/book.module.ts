import { Module, forwardRef } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book, BookSchema } from './schema/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentService } from 'src/student/student.service';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),forwardRef(() =>StudentModule)],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService]
})
export class BookModule {}
