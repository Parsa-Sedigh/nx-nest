import { Body, Controller, Get, Post } from '@nestjs/common';
import { Article, ArticlesService } from '@nx-nest/api/data-access-article';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto } from '@nx-nest/api/data-access-dtos';

@Controller('articles')
@ApiTags('articles')
export class ArticleController {

  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  @ApiOkResponse({
    type: Article,
    isArray: true
  })
  async getAllArticles() {
    return await this.articleService.getAll();
  }

  @Post()
  @ApiCreatedResponse({
    type: Article
  })
  async createArticle(@Body() article: CreateArticleDto) {
    return await this.articleService.createArticle(article);
  }
}
