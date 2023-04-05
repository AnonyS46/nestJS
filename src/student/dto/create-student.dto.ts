import { Book } from "src/book/schema/book.schema";
import { StudentDTO } from "./student.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStudentDto extends StudentDTO {

    @ApiProperty()
    bookId:string;
}
