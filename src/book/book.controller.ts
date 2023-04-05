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
   */
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Get(':id/owner')
  findOwnerById(@Param('id') id: string) {
    return this.bookService.findOwnerById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
