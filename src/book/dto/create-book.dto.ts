import { ApiProperty } from "@nestjs/swagger";
import { BookDto } from "./book.dto";

export class CreateBookDto extends BookDto{
    @ApiProperty()
    ownerId: string;
}
