import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/students'),
    StudentModule,
    BookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
