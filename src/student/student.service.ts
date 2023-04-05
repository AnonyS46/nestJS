import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { StudentDTO } from './dto/student.dto';
import { Model } from 'mongoose';
import { Student } from './schema/student.schema';
import { BookService } from 'src/book/book.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) public studentModel: Model<Student>,
    @Inject(forwardRef(() => BookService))
    private bookService: BookService,
  ) {}


  /**
   * Tạo mới một học sinh
   * @param createStudentDto 
   * @returns 
   * @author Cường
   */
  async create(createStudentDto: CreateStudentDto) {
    // VALIDATE
    if (!createStudentDto.name) {
      throw new BadRequestException('Tên không được để trống');
    }

    if (!createStudentDto.age) {
      throw new BadRequestException('Tuổi không được để trống');
    }

    // TẠO VÀ LƯU XUỐNG DB
    const studentNew: Student = new Student();
    studentNew.name = createStudentDto.name;
    studentNew.age = createStudentDto.age;
    studentNew.address=createStudentDto.address;
    studentNew.phone=createStudentDto.phone;
    if(createStudentDto.bookId) {
      studentNew.books = [];
      studentNew.books.push(await this.bookService.bookModel.findById(createStudentDto.bookId));
    }
    const createdStudent = await new this.studentModel(studentNew).save();

    // RETURN
    return createdStudent;
  }

  /**
   * Lấy danh sách học sinh
   * @returns 
   * @author Cường
   */
  async findAll():Promise<StudentDTO[]> {
    let studentDtoListResult: StudentDTO[] = [];


    //Đổ data vào studentDtoListResult
    let studentListResult:Student[] = []
    studentListResult = await this.studentModel.find({});
    studentDtoListResult = studentListResult.map(student =>{
        return new StudentDTO(student.name,student.age,student.address,student.phone);
      }
    );

    //RETURN
    return studentDtoListResult;
  }

  /**
   * Lấy thông tin chi tiết một học sinh
   * @param studentId 
   * @returns 
   * @author Cường
   */
  async findOne(studentId: string) {
    let student :Student = await this.studentModel.findById(studentId).populate('books');

    //Lấy thông tin sách của học sinh
    // student.books = [];

    // for(let i=0;i<student.books.length;i++) {
    //   let bookId = student.books[i];
    //   let book = await this.bookService.bookModel.findById(bookId);
    //   student.books.push(book);
    // }

    //RETURN
    return student;
  }


  /**
   * Cập nhật thông tin học sinh qua id
   * @param studentId 
   * @param updateStudentDto 
   * @returns 
   * @author Cường
   */
  async update(studentId: string, updateStudentDto: UpdateStudentDto) {

    // VALIDATE
    // validate student tồn tại
    let student: Student = await this.studentModel.findById(studentId).exec();
    if ( !student ) {
      throw new BadRequestException('Student not found');
    }

    // validate tên
    if ( !updateStudentDto.name ) {
      throw new BadRequestException('Tên không được để trống');
    }

    //validate tuổi
    if ( !updateStudentDto.age ) {
      throw new BadRequestException('Tuổi không hợp lệ');
    }

    // CẬP NHẬT VÀ LƯU XUỐNG DB
    student.name = updateStudentDto.name;
    student.age = updateStudentDto.age;
    student.address = updateStudentDto.address;
    student.phone = updateStudentDto.phone;

    let updatedStudent: Student = await this.studentModel.findByIdAndUpdate(
      studentId,
      student,
      {
        new: true,
      },
    );

    // RETURN
    updatedStudent = await this.studentModel.findById(studentId);
    return updatedStudent;
  }

  /**
   * Xóa một học sinh qua id
   * @param studentId 
   * @returns 
   * @author Cường
   */
  async remove(studentId: string) {
    return await this.studentModel.findByIdAndDelete(studentId);
  }
}
