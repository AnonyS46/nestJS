import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { Information, InformationSchema } from './schema/information.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Information.name, schema: InformationSchema }])],
  controllers: [InformationController],
  providers: [InformationService]
})
export class InformationModule {}
