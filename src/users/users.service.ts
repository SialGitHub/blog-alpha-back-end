import { Inject, Injectable } from "@nestjs/common";
import { RoleEnum, User } from "./user.interface";
import { UsersModule } from "./users.module";
import { UserEntity } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommentEntity } from "../entities/comment.entity";

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    this.users = [
      {
        role: RoleEnum.Author,
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        role: RoleEnum.Author,
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        role: RoleEnum.Author,
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findAll(): Promise<User[]>{
    return this.users;
  }
}