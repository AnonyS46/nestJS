import { Injectable } from '@nestjs/common';
import { CreateInformationDto } from './dto/create-information.dto';
import { UpdateInformationDto } from './dto/update-information.dto';
import { Information } from './schema/information.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InformationService {

  constructor(
    @InjectModel(Information.name) private infoModel: Model<Information>
  ) {
    
  }

  create(createInformationDto: CreateInformationDto) {
    return new this.infoModel(createInformationDto).save();
  }

  findAll() {
    return this.infoModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} information`;
  }

  update(id: number, updateInformationDto: UpdateInformationDto) {
    return `This action updates a #${id} information`;
  }

  remove(id: number) {
    return `This action removes a #${id} information`;
  }
}
