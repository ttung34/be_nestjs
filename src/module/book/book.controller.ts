import { Controller,Body,Post } from "@nestjs/common";
import { ApiTags} from "@nestjs/swagger";
import { BookService } from "./book.service";
import { BookDto } from "./book.dto";

@ApiTags('Book')
@Controller('api/v1/book')
export class BookController{
    constructor(private readonly bookService: BookService) { }
    @Post('/add')
    async createBook(@Body() data: BookDto) {
        return await this.bookService.createBook(data);
    }
}