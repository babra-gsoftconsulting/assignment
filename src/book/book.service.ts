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
    const createdBook = new this.bookModel(book);
    return createdBook.save();
  }

  async update(
    id: string,
    updateBookDto: UpdateBookDto,
    userId: string,
  ): Promise<Book> {
    const existingBook = await this.bookModel.findById(id);

    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }

    if (existingBook.createdBy.toString() !== userId.toString()) {
      throw new ForbiddenException('You are not allowed to update this book');
    }

    existingBook.name = updateBookDto.name !== undefined ? updateBookDto.name : existingBook.name;
    existingBook.price = updateBookDto.price !== undefined ? updateBookDto.price : existingBook.price;
    existingBook.gerne = updateBookDto.gerne !== undefined ? updateBookDto.gerne : existingBook.gerne;
    existingBook.description = updateBookDto.description !== undefined ? updateBookDto.description : existingBook.description;
    

    return existingBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find();
  }
  
  async findById(id:string): Promise<Book[]> {
    return this.bookModel.findById(id);
  }
}
