import { CreatePostDto } from '../dtos/post.dto';
import { PostEntity } from '../repositories/post.entity';

export interface IPostService {
  getAllPost(): Promise<PostEntity[]>;
  createPost(createPostDto: CreatePostDto): Promise<PostEntity>;
  deletePost(id: number): Promise<void>;
}
