import { ApiProperty } from "@nestjs/swagger";

export class StudentDTO {

  @ApiProperty()
  name: string;
  
  @ApiProperty()
  age: number;

  @ApiProperty()
  address:string;

  @ApiProperty()
  phone:string;

  constructor(name: string, age: number, address: string, phone:string) {
    this.name = name;
    this.address = address;
    this.age = age;
    this.phone = phone;

  }
}