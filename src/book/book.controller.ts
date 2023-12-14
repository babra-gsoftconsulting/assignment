import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Book } from './models/book.model';
import { BookService } from './book.service';
import { Roles } from 'src/common/roles/role.decorator';
import { RolesGuard } from 'src/common/roles/role.guards';
import { Request } from 'express';
import { UpdateBookDto } from './dtos/updateBook.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { Role } from 'src/common/constant/roles.enum';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('createBook')
  @Roles([Role.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createBookDto: Book, @Req() request: Request): Promise<Book> {
    const user: any = request.user;
    createBookDto.createdBy = user._id;
    return this.bookService.create(createBookDto);
  }

  @Put('updateBook/:id')
  @Roles([Role.Admin])
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Body() updateBookDto: UpdateBookDto,
    @Param('id')
    id: string,
    @Req() request: Request,
  ): Promise<Book> {
    const user: any = request.user;
    return this.bookService.update(id, updateBookDto, user._id);
  }

  @Get('getAllBooks')
  @Roles([Role.Admin, Role.User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get('getById/:id')
  @Roles([Role.Admin, Role.User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  findById(@Param('id') id:string): Promise<Book[]> {
    return this.bookService.findById(id);
  }
}
