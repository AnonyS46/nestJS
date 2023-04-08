import { ApiProperty } from "@nestjs/swagger";

export class BookDto {

    @ApiProperty()
    title: string; //tiêu đề

    @ApiProperty()
    totalPage: number; //tổng số trang

    @ApiProperty()
    author: string; // tác giả

    constructor(title: string, totalPage: number,author: string) {
        this.title = title;
        this.totalPage = totalPage;
        this.author = author;
    }
 

}