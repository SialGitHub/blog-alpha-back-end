import { Module } from '@nestjs/common';
import { AppController} from "./app.controller";
import { AppService} from "./app.service";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule} from "./posts/posts.module";
import { CommentsModule} from "./comments/comments.module";
import { TypeOrmModule} from "@nestjs/typeorm";
import { PostsService } from "./posts/posts.service";
import { CommentsService } from "./comments/comments.service";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    PostsService,
    CommentsService
  ],
})
export class AppModule {}

