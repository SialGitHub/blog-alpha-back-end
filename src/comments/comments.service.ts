import { Injectable } from '@nestjs/common';
// import { User } from "../interfaces/user.interface";
// import { Post } from "../interfaces/post.interface";
import { PostsService } from "../posts/posts.service";
// import { Comment } from "../interfaces/comment.interface";
import { PostEntity } from "../entities/post.entity";
import { CommentEntity } from "../entities/comment.entity";
import { UserEntity } from "../entities/user.entity";
const uiid = () => {
  return Math.floor(Math.random()*9999999999);
}

@Injectable()
export class CommentsService {
  private comments: CommentEntity[] = [];
  constructor(
    private postsService:PostsService) {
  }

  async createOne( author: UserEntity, postId: number, text: string){
    const post: PostEntity = await this.postsService.getPostById(postId);
    const comment: CommentEntity = {
      id: uiid(),
      post,
      author,
      text,
    };
    this.comments.push(comment);
    return comment;
  }

  async getCommentById( id: number) : Promise<CommentEntity>{
    return this.comments.find( comment => comment.id === id)
  }

  async getAllMyComments( author: UserEntity) : Promise<CommentEntity[]>{
    return this.comments.filter(comment => comment.author.userId === author.userId);
  }

  async getAllComments() : Promise<CommentEntity[]>{
    return this.comments;
  }

  async deleteComment( author: UserEntity, id: number) : Promise<CommentEntity> {
    let comments : CommentEntity[] = this.comments;
    const comment : CommentEntity = this.comments.find( com => com.id === id)
    if ( comment && comment.author.userId === author.userId){
      comments = [...comments].filter( com => com.id !== id);
      this.comments = comments;
      return comment;
    }
  }

  async updateComment( author: UserEntity, id: number, text: string) : Promise<CommentEntity> {
    const comment: CommentEntity = this.comments.find( c => c.id === id );
    if( comment && comment.author.userId === author.userId){
      this.comments = this.comments.map( c => c.id === comment.id ? ({...comment, text}): c);
      return {...comment, text};
    }
  }
}
