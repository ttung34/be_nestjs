import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {  UserDto } from "./user.dto";
import { PrismaService } from "src/service/prisma.service";

@Injectable()
export class UserService{

    constructor(private readonly prisma: PrismaService) { }

    createAuth = async (data: UserDto) => {
        try {

            const exisUser = await this.prisma.user.findUnique(
                {
                    where: {
                        email: data?.email
                    }
                }
            ) 
            

            if (exisUser) {
                throw new HttpException("Email này đã được sử dụng", HttpStatus.BAD_REQUEST)
            }
            console.log('exisUser', exisUser?.email)

            const result = await this.prisma.user.create(
                {
                    data
                }
            )
            return {
                data: result,
                message: 'Oki',
                exisUser: exisUser,
            }
        } catch (error) {
            console.log("error", error?.message)
            throw new HttpException(JSON.stringify(error.message), 502)
        }
    }
}