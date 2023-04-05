import { ApiProperty } from "@nestjs/swagger";

export class BookDto {

    @ApiProperty()
    title: string;

    @ApiProperty()
    totalPage: number;

    @ApiProperty()
    author: string;

    constructor(title: string, totalPage: number,author: string) {
        this.title = title;
        this.totalPage = totalPage;
        this.author = author;
    }
 

}