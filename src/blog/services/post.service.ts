import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/post.dto';
import { IPostService } from '../interfaces/post.service.interface';
import { PostEntity } from '../repositories/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepo: Repository<PostEntity>,
  ) {}
  async getAllPost(): Promise<PostEntity[]> {
    return await this.postRepo.find();
  }
  async createPost(createPostDto: CreatePostDto): Promise<PostEntity> {
    const createdPo = this.postRepo.create(createPostDto);
    return await this.postRepo.save(createdPo);
  }
  async deletePost(id: number): Promise<void> {
    await this.postRepo.delete(id);
  }
}
