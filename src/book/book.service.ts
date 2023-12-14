import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './models/book.model';
import { UpdateBookDto } from './dtos/updateBook.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(book: Book): Promise<Book> {
    return await new this.bookModel(book).save();
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    userId: string,
  ): Promise<Book> {
    const query = {
      createdBy: userId,
      _id: id
    }
    const existingBook = await this.bookModel.findOne(query);

    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }
    return await this.bookModel.findByIdAndUpdate(query, updateBookDto, {new: true})
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find();
  }

  async findById(id:string): Promise<Book[]> {
    return this.bookModel.findById(id);
  }
}
