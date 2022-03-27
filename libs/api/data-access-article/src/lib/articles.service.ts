import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';
import { Article, ArticleDocument } from './article.model';
import { CreateArticleDto } from '@nx-nest/api/data-access-dtos';

@Injectable()
export class ArticlesService {

  constructor(@InjectModel(Article.name) private readonly articleModel: Model<ArticleDocument>) {}

  async getAll() {
    return await this.articleModel.find().exec();
  }

  async createArticle(dto: CreateArticleDto) {
    const article = new this.articleModel(dto);

    return await this.articleModel.create(article);
  }
}
