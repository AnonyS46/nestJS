import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),forwardRef(() => BookModule),
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
