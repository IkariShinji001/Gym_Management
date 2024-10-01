import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { PostEntity } from './repositories/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [PostService],
})
export class BlogModule {}
