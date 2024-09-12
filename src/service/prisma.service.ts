import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect(); // Kết nối đến cơ sở dữ liệu khi module được khởi tạo
  }

  async onModuleDestroy() {
    await this.$disconnect(); // Ngắt kết nối khi module bị hủy
  }
}
