import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * API tạo một quyển sách
   * @param createBookDto 
   * @returns 
   * @author Cường
   */
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createOneBook(createBookDto);
  }

  /**
   * API lấy danh sách thông tin các cuốn sách
   * @returns 
   * @author Cường
   */
  @Get()
  findAll() {
    return this.bookService.findAllBook();
  }

  /**
   * API lấy thông tin chi tiết một cuốn sách
   * @param bookId 
   * @returns 
   * @author Cường
   */
  @Get(':bookId')
  findOne(@Param('bookId') bookId: string) {
    return this.bookService.findOneBook(bookId);
  }

  @Get(':bookId/owner')
  findOwnerById(@Param('bookId') bookId: string) {
    return this.bookService.findOwnerById(bookId);
  }

  /**
   * API cập nhật thông tin cho một cuốn sách
   * @param bookId 
   * @param updateBookDto 
   * @returns 
   * @author Cường
   */
  @Put(':bookId')
  update(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateOneBook(bookId, updateBookDto);
  }

  /**
   * API xóa một cuốn sách
   * @param bookId 
   * @returns 
   * @author Cường
   */
  @Delete(':id')
  remove(@Param('id') bookId: string) {
    return this.bookService.removeOneBook(bookId);
  }
}
