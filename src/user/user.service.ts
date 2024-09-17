import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {  LoginDto, UserDto } from "./user.dto";
import { PrismaService } from "src/service/prisma.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
@Injectable()
export class UserService{

    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

    createUser = async (data: UserDto) => {
        try {

            const exisUser = await this.prisma.user.findUnique(
                {
                    where: {
                        email: data?.email
                    }
                }
            ) 
            

            if (exisUser) {
                throw new HttpException("Email này đã được sử dụng", HttpStatus.UNPROCESSABLE_ENTITY)
            }

            const hashPassword = await bcrypt.hash(data.password, 10);
            console.log("hassPassword", hashPassword);

            const result = await this.prisma.user.create(
                {
                    data: {
                        ...data, password: hashPassword
                    }
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

    login = async (data:LoginDto ) => {
        try {
            const {email, password} =data
            const user = await this.prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (!user) {
                throw new HttpException("User not empty", HttpStatus.UNAUTHORIZED);
            }

            const passwordValid = await bcrypt.compare(password, user.password);

            if (!passwordValid) {
                throw new HttpException("Password sai", HttpStatus.UNAUTHORIZED);
            }

            const token = await this.jwtService.signAsync({
                id: user.id,
                email: user.email
            })

            console.log("tpken", token)
            return {
                message: 'Oki',
                success: "Successfully",
                data: {
                    accessToken: token,
                }
            }
        } catch (error) {
            console.log(error)
            throw new HttpException(JSON.stringify(error), error?.status ?? 500)
        }
    }
}


//backend sẽ cung cấp một token cho người dùng, người dùng sẽ sử dụng token này để đăng nhập vào các tài nguyên hệ thống.
//fontend gửi thông tin đăng nhập
//backend sẽ tạo ra một token sử dụng bằng jwt 
// token tạo ra bằng mã hoá thông tin người dùng kèm theo một chuỗi ký tự bí mật
// có token thì be trả về cho fe 
//Sau khi nhận được token từ be thì fe cần lưu lại vào strogae, cookie và sẽ gửi lên những lền truy cập kế tiếp
// Sau khi fe gửi lại token lên thì be kiểm tra tính hợp lệ thông tin người dùng
// Be sẽ trả về hai accessToken và RefershToken, accessToken có thời gian ngắn hơn refeshToken và sau khi hết hạn accessToken thì fe sẽ gửi lại be kèm refreshToken để Be cung cấp lại accessToken