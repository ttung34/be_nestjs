import { PrismaService } from "src/service/prisma.service";
import { BookDto } from "./book.dto";
import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService) { }
    createBook = async (data: BookDto) => {
        try {
            const existingBook = await this.prisma.book.findUnique({
                where: {authorId: data.authorId}
            });
            if (existingBook) {
                throw new BadRequestException("Người dùng này đã có quyển sách này");
            }
            const newBook = await this.prisma.book.create({
                data: {
                    title: data.title,
                    author: {
                        connect: {id: data.authorId}
                    }
                }
            })
            return {
                data: newBook,
                message: "Thêm sách thành công",
                existingBook: existingBook,
            }
        } catch (error) {
            console.log("error: ", error.message);
            throw new HttpException(JSON.stringify(error.message), HttpStatus.BAD_GATEWAY);
        }
    }
}