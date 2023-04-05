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
    
    //VALIDATE
    if(this.validateBookData(createBookDto)) {
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

  }

  /**
   * kiểm tra thông tin đầu vào của quyển sách được thêm
   * @param createBookDto 
   * @returns 
   */
  validateBookData(data:any):boolean {
    let check:boolean = true;

    // VALIDATE
    if ( !data.title ) {
      check = false;
      throw new BadRequestException('Tiêu đề không được để rỗng');
    }

    if( !data.totalPage || !Number.isInteger(Number(data.totalPage))) {
      check = false;
      throw new BadRequestException('Số trang phải hợp lệ');
    }
    if( !data.author ) {
      check = false;
      throw new BadRequestException('Tên tác giả không được rỗng');
    }

    return check;
  }


  /**
   * Lấy ra toàn bộ sách trong db
   * @returns 
   * @author Cường
   */
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
   * @author Cường
   */
  async findOwnerById(bookId:string) {
    return await this.bookModel.findById(bookId).populate('owner');
  }


  /**
   * Lấy thông tin chi tiết một cuốn sách
   * @param bookId 
   * @returns 
   * @author Cường
   */
  findOne(bookId: string) {
    return this.bookModel.findById(bookId).populate('owner');;
  }

  /**
   * Cập nhật thông tin sách
   * @param bookId 
   * @param updateBookDto 
   * @returns 
   * @author Cường
   */
  async update(bookId: string, updateBookDto: UpdateBookDto) {
    let book : Book = await this.bookModel.findById(bookId);

    //Validate thông tin sách
    if(this.validateBookData(updateBookDto)) {

      book.title = updateBookDto.title;
      book.author = updateBookDto.author;
      book.totalPage = updateBookDto.totalPage;

      let updatedBook = await this.bookModel.findByIdAndUpdate(bookId, book,{new:true});
      updatedBook = await this.bookModel.findById(bookId);

      return updatedBook;
    }
  }
  
  /**
   * Xóa 1 cuốn sách
   * @param bookId 
   * @returns 
   * @author Cường
   */
  remove(bookId: string) {
    return this.bookModel.findByIdAndDelete(bookId);
  }
}
