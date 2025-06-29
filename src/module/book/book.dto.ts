import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class BookDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;
    @IsNotEmpty()
    @IsNumber()
    readonly authorId: number;
}