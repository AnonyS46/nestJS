import { ApiProperty } from "@nestjs/swagger";

export class StudentDTO {

  @ApiProperty()
  name: string; //họ tên
  
  @ApiProperty()
  age: number; // tuổi

  @ApiProperty()
  address:string; // địa chỉ

  @ApiProperty()
  phone:string; //số điện thoại

  constructor(name: string, age: number, address: string, phone:string) {
    this.name = name;
    this.address = address;
    this.age = age;
    this.phone = phone;

  }
}