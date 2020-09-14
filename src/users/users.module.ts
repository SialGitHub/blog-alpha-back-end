import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
