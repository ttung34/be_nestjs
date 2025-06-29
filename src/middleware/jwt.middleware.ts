// Middleware sẽ là một hàm trước một cái hàm xử lý router hàm middleware được phép truy cập vào request và response
// function A(req, res, next){
// if(a>a):
// next()
//else
// res(tra ve loix)
//}
import { HttpException, HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JWTMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService) {
        
    }
    async use(req: Request, res: Response, next: NextFunction) {
        const accessToken = req.headers["access_token"] as string | undefined;
        console.log("JWT Middleware ~ use ~ req :", accessToken);
// Kiểm tra xem accessToken có hay không 
        if (!accessToken) {
            throw new UnauthorizedException("Không truyền token lên à");
        }
        try {
            const tokenValid = await this.jwtService.verifyAsync(accessToken, {
                secret:process.env.JWT_PRIVATE_KEY,
            });
            console.log("tokenValid: ", tokenValid);
// Kiểm tra xem token có hợp lệ hay không
// Nếu hợp lên thì truyền thêm biến user bằng chính giá trị của token và pass middleware này để chạy tiếp
            if (tokenValid) {
                req["user"] = tokenValid;
                next()
            } else {
                throw new UnauthorizedException("Token không hợp lệ");
            }

        } catch (error) {
            throw new HttpException(error?.message, HttpStatus.UNAUTHORIZED);
        }
    }
}