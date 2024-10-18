import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { PostService } from "../services/post.service";
import { PostEntity } from "../repositories/post.entity";
import { CreatePostDto } from "../dtos/post.dto";

@Controller('/blogs')
export class PostController{
    constructor(
        private postService: PostService
    ){}

    @Get()
    async getAll():Promise<PostEntity[]> {
        return this.postService.getAllPost()
    }

    @Get("/posts/:id")
    async getOneById(@Param('id') id:number):Promise<PostEntity>{
        return this.postService.findOneById(id)
    }

    @Post()
    async createPost(
        @Body()
        createPostDto: CreatePostDto): Promise<PostEntity>{
        return this.postService.createPost(createPostDto);
    }

    @Delete()
    async deletePost(@Param('id')id: number): Promise<void> {
        return this.postService.deletePost(id)
    }
}