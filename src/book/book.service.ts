import { BadRequestException, Injectable, forwardRef,Inject} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schema/book.schema';
import { StudentService } from 'src/student/student.service';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookDto } from './dto/book.dto';
import { StudentDTO } from 'src/student/dto/student.dto';
import { Student } from 'src/student/schema/student.schema';

@Injectable()
export class BookService {

  constructor(
    @InjectModel(Book.name) public bookModel: Model<Book>,
    @Inject(forwardRef(() => StudentService))
    private studentService: StudentService,
  ) {

  }


  /**
   * Thêm mới một cuốn sách
   * @param createBookDto 
   * @returns 
   * @author Cường
   */
  async createOneBook(createBookDto: CreateBookDto) {
    // VALIDATE
    if ( !createBookDto.title ) {
      throw new BadRequestException('Tiêu đề không được để rỗng');
    }

    if( !createBookDto.totalPage || !Number.isInteger(Number(createBookDto.totalPage))) {
      throw new BadRequestException('Số trang phải hợp lệ');
    }

    // if( !createBookDto.ownerId ) {
    //   throw new BadRequestException('Mã học sinh không được rỗng');
    // }

    if( !createBookDto.author ) {
      throw new BadRequestException('Tên tác giả không được rỗng');
    }

    // TẠO VÀ LƯU XUỐNG DB
    let book:Book = new Book();
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.totalPage = createBookDto.totalPage;

    //lấy ra học sinh và thêm dữ liệu vào trường books cho học sinh
    if(createBookDto.ownerId) {
      let owner:Student = await this.studentService.findOne(createBookDto.ownerId);
      book.owner = owner;
      owner.books.push(book);
      await this.studentService.studentModel.findByIdAndUpdate(createBookDto.ownerId,owner,{new : true});
    }
    const createdBook = await new this.bookModel(book).save();

    
    // RETURN
    return createdBook;
  }

  


  async findAll() {
    let bookDtoListResult:BookDto[] = [] ;

    // Đổ dữ liệu vào bookDtoListResult    
    let bookList = await this.bookModel.find({});
    bookDtoListResult = bookList.map(book => {
      return new BookDto(book.title,book.totalPage,book.author);
    })

    //RETURN
    return bookDtoListResult;
  }


  /**
   * Tìm chủ sở hữu của một cuốn sách
   * @param bookId 
   */
  async findOwnerById(bookId:string) {
    return await this.bookModel.findById(bookId).populate('owner');

  }

  findOne(bookId: string) {
    return `This action returns a #${bookId} book`;
  }

  update(bookId: string, updateBookDto: UpdateBookDto) {
    return `This action updates a #${bookId} book`;
  }

  remove(bookId: string) {
    return `This action removes a #${bookId} book`;
  }
}
