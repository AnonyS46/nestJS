import {Controller,Get,Post,Body,Param,Delete,Put,} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('/students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  /**
   * API tạo mới 1 học sinh
   * @param createStudentDto 
   * @returns 
   * @author Cường
   */
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  /**
   * API lấy nhiều học sinh
   * @returns 
   * @author Cường
   */
  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  /**
   * API lấy chi tiết 1 học sinh
   * @param studentId 
   * @returns 
   * @author Cường
   */
  @Get(':studentId')
  findOne(@Param('studentId') studentId: string) {
    // console.log(studentId);
    return this.studentService.findOne(studentId);
  }

  /**
   * 
   * @param studentId 
   * @param updateStudentDto 
   * @returns 
   * @author Cường
   */
  @Put(':studentId')
  update(@Param('studentId') studentId: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(studentId, updateStudentDto);
  }

  @Delete(':studentId')
  remove(@Param('studentId') studentId: string) {
    return this.studentService.remove(studentId);
  }
}
